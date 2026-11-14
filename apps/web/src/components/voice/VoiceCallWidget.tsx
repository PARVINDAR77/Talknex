'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Bot,
  Pause,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function VoiceCallWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Live Voice AI State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [liveStatus, setLiveStatus] = useState<string>('Ready to talk');
  const [liveTranscript, setLiveTranscript] = useState<{ speaker: string; text: string }[]>([]);
  const [textInput, setTextInput] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [micLevel, setMicLevel] = useState<number>(0);

  // Engine Refs (using refs to guarantee zero stale closures in animation/audio loops)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speechWatchdogRef = useRef<NodeJS.Timeout | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLiveActiveRef = useRef<boolean>(false);
  const isAiSpeakingRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);
  const isUserRecordingRef = useRef<boolean>(false);
  const isTranscribingRef = useRef<boolean>(false);
  const activeMediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const speechStartTimeRef = useRef<number>(0);
  const vadAnimIdRef = useRef<number | null>(null);

  // Play telephone connection sound
  const playTelephonyChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  };

  // Timer interval
  useEffect(() => {
    if (isLiveActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLiveActive]);

  // Clean voices on load
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // ========================================================
  // LIVE VOICE AI ENGINE (MEDIARECORDER + GROQ WHISPER STT + AUDIO VAD)
  // ========================================================

  const setupAudioStream = async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) return;

      if (!activeMediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        activeMediaStreamRef.current = stream;
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (!analyserRef.current) {
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioContextRef.current.createMediaStreamSource(activeMediaStreamRef.current);
        source.connect(analyser);
      }

      startVoiceActivityMonitoring();
    } catch (err) {
      console.warn('Microphone setup notice:', err);
      setLiveStatus('Microphone permission required');
    }
  };

  const startVoiceActivityMonitoring = () => {
    if (vadAnimIdRef.current) {
      cancelAnimationFrame(vadAnimIdRef.current);
      vadAnimIdRef.current = null;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let consecutiveVoiceFrames = 0;
    let consecutiveSilenceFrames = 0;

    const checkVAD = () => {
      if (!isLiveActiveRef.current) return;

      analyser.getByteTimeDomainData(dataArray);

      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const norm = (dataArray[i] - 128) / 128;
        sumSquares += norm * norm;
      }
      const rms = Math.sqrt(sumSquares / dataArray.length);

      // Volume level for visualization (0 to 100)
      const level = Math.min(100, Math.round(rms * 900));
      setMicLevel(level);

      const isAiBusy = isAiSpeakingRef.current || isProcessingRef.current;
      // Sensitive threshold (0.016) so soft words and trailing word endings are never cut off
      const threshold = isAiBusy ? 0.048 : 0.016;

      if (rms > threshold && !isTranscribingRef.current) {
        consecutiveVoiceFrames++;
        consecutiveSilenceFrames = 0;

        // Barge-in: user talks while AI is speaking
        if (isAiBusy && consecutiveVoiceFrames >= 3) {
          interruptAi();
        }

        if (!isAiSpeakingRef.current && !isProcessingRef.current) {
          if (!isUserRecordingRef.current) {
            beginRecording();
          }
          // Reset silence timer: user is speaking, do NOT interrupt them!
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        }
      } else {
        consecutiveVoiceFrames = 0;
        if (isUserRecordingRef.current) {
          consecutiveSilenceFrames++;

          // Require sustained silence (at least 15 quiet frames ~250ms) before starting the timer
          if (consecutiveSilenceFrames >= 15) {
            if (!silenceTimerRef.current) {
              // Natural conversational pause: 1800ms of true silence before committing speech
              silenceTimerRef.current = setTimeout(() => {
                finishRecordingAndTranscribe();
              }, 1800);
            }
          }
        }
      }

      vadAnimIdRef.current = requestAnimationFrame(checkVAD);
    };

    vadAnimIdRef.current = requestAnimationFrame(checkVAD);
  };

  const beginRecording = () => {
    if (
      !activeMediaStreamRef.current ||
      isAiSpeakingRef.current ||
      isProcessingRef.current ||
      isTranscribingRef.current ||
      isUserRecordingRef.current
    ) {
      return;
    }

    try {
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg'
      ];
      let selectedMime = '';
      for (const m of mimeTypes) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) {
          selectedMime = m;
          break;
        }
      }

      const recorder = new MediaRecorder(
        activeMediaStreamRef.current,
        selectedMime ? { mimeType: selectedMime } : {}
      );

      audioChunksRef.current = [];
      speechStartTimeRef.current = Date.now();

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        handleRecordedSpeechBlob(selectedMime);
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      isUserRecordingRef.current = true;
      setIsRecording(true);
      setLiveStatus('Listening to you… Speak freely');
    } catch (e) {
      console.warn('Failed to start MediaRecorder:', e);
    }
  };

  const finishRecordingAndTranscribe = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    isUserRecordingRef.current = false;
    setIsRecording(false);
  };

  const handleRecordedSpeechBlob = async (mimeType: string) => {
    if (!isLiveActiveRef.current) return;

    const chunks = [...audioChunksRef.current];
    audioChunksRef.current = [];
    const duration = Date.now() - speechStartTimeRef.current;

    // Ignore tiny accidental noise (< 300ms)
    if (chunks.length === 0 || duration < 300) {
      setLiveStatus('Mic Active · Speak now');
      return;
    }

    const audioBlob = new Blob(chunks, { type: mimeType || 'audio/webm' });
    if (audioBlob.size < 600) {
      setLiveStatus('Mic Active · Speak now');
      return;
    }

    isTranscribingRef.current = true;
    setLiveStatus('Transcribing speech with Whisper…');

    try {
      const ext = (mimeType || '').includes('wav') ? 'wav' : (mimeType || '').includes('mp4') ? 'mp4' : (mimeType || '').includes('ogg') ? 'ogg' : 'webm';
      const formData = new FormData();
      formData.append('file', audioBlob, `speech.${ext}`);

      const res = await fetch('/api/voice/transcribe', {
        method: 'POST',
        body: formData
      });

      const data = await res.json().catch(() => ({}));
      const text = (data.text || '').trim();

      // Filter out hallucinated whisper noise on pure silence
      if (!text || /^(thank you|thanks for watching|subtitles by|amara\.org)\.?$/i.test(text)) {
        setLiveStatus('Mic Active · Speak now');
        isTranscribingRef.current = false;
        return;
      }

      // Add user message to transcript
      setLiveTranscript((prev) => [...prev, { speaker: 'You', text }]);

      // Send to AI for answer
      handleSendLiveMessage(text);
    } catch (err) {
      console.warn('Whisper transcription error:', err);
      setLiveStatus('Mic Active · Speak now');
    } finally {
      isTranscribingRef.current = false;
    }
  };

  const handleSendLiveMessage = async (userText: string) => {
    if (!userText || !userText.trim()) return;

    isProcessingRef.current = true;
    setLiveStatus('TalkNex AI is thinking…');

    try {
      const res = await fetch('/api/voice/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userText.trim() }]
        })
      });

      const data = await res.json().catch(() => ({}));
      const reply =
        data.answer ||
        'TalkNex ke plans ₹4,999 per month se start hote hain jisme 1,200 calling minutes aur sub-500ms latency milti hai. Aap kya janna chahte hain?';

      setLiveTranscript((prev) => [...prev, { speaker: 'TalkNex AI', text: reply }]);
      speakAiReply(reply);
    } catch {
      const fallback =
        'TalkNex AI telephony native Hindi, Gujarati aur English fluently bolta hai. Boliye aap plans ke baare mein kya janna chahte hain?';
      setLiveTranscript((prev) => [...prev, { speaker: 'TalkNex AI', text: fallback }]);
      speakAiReply(fallback);
    }
  };

  const speakAiReply = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isAiSpeakingRef.current = true;
      setIsAiSpeaking(true);
      setLiveStatus('TalkNex AI Speaking…');

      const utterance = new SpeechSynthesisUtterance(text);
      (window as any).__activeUtterance = utterance;

      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) =>
          v.lang.includes('hi') ||
          v.lang.includes('en-IN') ||
          v.name.includes('India') ||
          v.name.includes('Swara')
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];
      if (indianVoice) utterance.voice = indianVoice;
      utterance.rate = 1.08;

      const handleDone = () => {
        isAiSpeakingRef.current = false;
        isProcessingRef.current = false;
        setIsAiSpeaking(false);
        if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);

        setTimeout(() => {
          if (isLiveActiveRef.current) {
            setLiveStatus('Mic Active · Speak now');
          }
        }, 300);
      };

      utterance.onend = handleDone;
      utterance.onerror = handleDone;

      const wordCount = text.split(/\s+/).length;
      const timeoutMs = Math.max(2500, Math.min(15000, wordCount * 450));
      if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
      speechWatchdogRef.current = setTimeout(handleDone, timeoutMs);

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        isAiSpeakingRef.current = false;
        isProcessingRef.current = false;
        setIsAiSpeaking(false);
        if (isLiveActiveRef.current) {
          setLiveStatus('Mic Active · Speak now');
        }
      }, 2000);
    }
  };

  const startLiveCall = async () => {
    isLiveActiveRef.current = true;
    setIsLiveActive(true);
    setLiveStatus('Connecting to TalkNex Voice AI…');
    playTelephonyChime();

    // 1. Setup audio stream & continuous VAD
    await setupAudioStream();

    const initialGreeting =
      'Namaste! Main TalkNex AI voice assistant bol rahi hoon. Aap TalkNex ke baare mein kya janna chahte hain? Jaise hamare pricing plans ya voice bot features?';

    setLiveTranscript([
      {
        speaker: 'TalkNex AI',
        text: initialGreeting
      }
    ]);

    // 2. Speak greeting
    speakAiReply(initialGreeting);
  };

  const interruptAi = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isAiSpeakingRef.current = false;
    isProcessingRef.current = false;
    setIsAiSpeaking(false);
    if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);
    setLiveStatus('Mic Active · Speak now');
  };

  const handleToggleMicPill = () => {
    if (!isLiveActiveRef.current || isProcessingRef.current || isTranscribingRef.current) {
      if (isAiSpeakingRef.current) interruptAi();
      return;
    }

    if (isAiSpeakingRef.current) {
      interruptAi();
      return;
    }

    if (isUserRecordingRef.current) {
      finishRecordingAndTranscribe();
    } else {
      beginRecording();
    }
  };

  const endLiveCall = () => {
    isLiveActiveRef.current = false;
    setIsLiveActive(false);
    setIsAiSpeaking(false);
    isAiSpeakingRef.current = false;
    isProcessingRef.current = false;
    isUserRecordingRef.current = false;
    isTranscribingRef.current = false;
    setIsRecording(false);
    setMicLevel(0);

    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (speechWatchdogRef.current) clearTimeout(speechWatchdogRef.current);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    mediaRecorderRef.current = null;

    if (vadAnimIdRef.current) {
      cancelAnimationFrame(vadAnimIdRef.current);
      vadAnimIdRef.current = null;
    }
    if (activeMediaStreamRef.current) {
      activeMediaStreamRef.current.getTracks().forEach((t) => t.stop());
      activeMediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
    analyserRef.current = null;

    setLiveStatus('Call ended');
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. TALKNEX ACTIVE PHONE CALL SCREEN MODAL */}
      {/* ======================================================== */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-6rem)] bg-[#070b14]/95 backdrop-blur-2xl rounded-[32px] border border-pink-500/20 text-white shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(236,72,153,0.12)] flex flex-col justify-between p-5 overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Top Call Header Bar */}
          <div className="flex items-center justify-between shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300">
              <span className={`w-2 h-2 rounded-full ${isLiveActive ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]' : 'bg-slate-500'}`} />
              <span>TalkNex AI</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-slate-300 tracking-wider">
                {formatTimer(seconds)}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (isLiveActive) endLiveCall();
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Minimize Call"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Caller Identity */}
          <div className="text-center mt-1 shrink-0">
            <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-pink-100 to-indigo-200 bg-clip-text text-transparent">
              TalkNex AI
            </h3>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
              Delivered via Telephony, WhatsApp & SMS in Hindi & English
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isAiSpeaking
                    ? 'bg-pink-400 animate-pulse'
                    : isRecording
                    ? 'bg-emerald-400 animate-ping'
                    : isLiveActive
                    ? 'bg-emerald-500'
                    : 'bg-slate-500'
                }`}
              />
              <span
                className={`text-xs font-bold ${
                  isAiSpeaking
                    ? 'text-pink-400'
                    : isRecording
                    ? 'text-emerald-400'
                    : 'text-slate-300'
                }`}
              >
                {isLiveActive ? liveStatus : 'Ready to talk · Tap Call to connect'}
              </span>
            </div>
          </div>

          {/* Center: Pulsing Avatar & Wave Ring Animation */}
          <div className="relative w-32 h-32 mx-auto my-0.5 flex items-center justify-center shrink-0">
            {(isAiSpeaking || isRecording) && (
              <>
                <span className="absolute inset-0 rounded-full border-2 border-pink-500/40 animate-ping pointer-events-none" />
                <span className="absolute -inset-2 rounded-full border border-indigo-400/30 animate-pulse pointer-events-none" />
                <span className="absolute -inset-4 rounded-full bg-pink-500/10 blur-xl pointer-events-none" />
              </>
            )}

            <div className="w-24 h-24 rounded-full bg-[#0d1627] border-2 border-pink-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center justify-center z-10 relative">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-indigo-600/40 to-pink-600/30 flex items-center justify-center">
                {isAiSpeaking ? (
                  <Bot className="w-9 h-9 text-pink-300 animate-bounce" />
                ) : isRecording ? (
                  <Mic className="w-9 h-9 text-emerald-400 animate-pulse" />
                ) : (
                  <Bot className="w-9 h-9 text-indigo-300" />
                )}
              </div>
            </div>
          </div>

          {/* Real-Time Dynamic Sound Wave Equalizer */}
          <div className="flex items-center justify-center gap-1 h-5 my-0.5 shrink-0">
            {[4, 10, 18, 24, 14, 20, 12, 16, 6].map((h, i) => {
              const active = isAiSpeaking || (isLiveActive && micLevel > 10);
              const height = active
                ? isAiSpeaking
                  ? Math.max(6, Math.min(20, h * (1 + 0.3 * Math.sin(Date.now() / 200 + i))))
                  : Math.max(4, Math.min(22, Math.round((micLevel / 100) * 22)))
                : 4;

              return (
                <span
                  key={i}
                  style={{ height: `${height}px`, transition: 'height 0.08s ease' }}
                  className={`w-1 rounded-full ${
                    isAiSpeaking ? 'bg-pink-400' : isRecording ? 'bg-emerald-400' : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          {/* Live Dialogue Captions / Subtitles Box */}
          <div className="flex-1 min-h-[90px] max-h-[135px] bg-black/40 rounded-2xl border border-white/5 p-3 overflow-y-auto space-y-2 text-xs font-sans shadow-inner">
            {liveTranscript.length === 0 ? (
              <div className="text-slate-400 text-center py-5 text-[11px] leading-relaxed">
                Click <strong>"Start Call"</strong> below to talk directly with TalkNex AI about pricing plans or voice bot deployment!
              </div>
            ) : (
              liveTranscript.map((t, idx) => {
                const isUser = t.speaker === 'You';
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl text-xs space-y-0.5 ${
                      isUser
                        ? 'bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 ml-3'
                        : 'bg-white/5 border border-white/5 text-slate-100 mr-3'
                    }`}
                  >
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider ${
                        isUser ? 'text-emerald-400' : 'text-pink-400'
                      }`}
                    >
                      {t.speaker}:
                    </span>
                    <p className="text-white leading-relaxed font-medium">{t.text}</p>
                  </div>
                );
              })
            )}

            {isRecording && (
              <div className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 animate-pulse flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Listening to you… Speak freely
                </span>
                <button
                  type="button"
                  onClick={() => finishRecordingAndTranscribe()}
                  className="px-2 py-0.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-[10px] font-extrabold cursor-pointer"
                >
                  Send Now →
                </button>
              </div>
            )}
          </div>

          {/* Real Phone Call Dial Controls */}
          {isLiveActive ? (
            <div className="flex items-center justify-center gap-5 pt-2 shrink-0">
              {/* Mute Mic Button */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  isMuted
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
                title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Main End Call Button */}
              <button
                type="button"
                onClick={endLiveCall}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              {/* Interrupt / Send Now Button */}
              {isAiSpeaking ? (
                <button
                  type="button"
                  onClick={interruptAi}
                  className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center hover:bg-amber-500/30 transition-all cursor-pointer"
                  title="Interrupt TalkNex AI"
                >
                  <Pause className="w-4 h-4" />
                </button>
              ) : isRecording ? (
                <button
                  type="button"
                  onClick={() => finishRecordingAndTranscribe()}
                  className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center hover:bg-emerald-500/30 transition-all cursor-pointer animate-pulse"
                  title="Done Speaking - Send Now"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleToggleMicPill}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                  title="Tap to Speak"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="pt-2 shrink-0">
              <button
                type="button"
                onClick={startLiveCall}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Start Call with TalkNex AI</span>
              </button>
            </div>
          )}

          {/* Interactive Text Fallback Input */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1 mt-2 shrink-0">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && textInput.trim()) {
                  const msg = textInput.trim();
                  setTextInput('');
                  if (isUserRecordingRef.current) finishRecordingAndTranscribe();
                  setLiveTranscript((prev) => [...prev, { speaker: 'You', text: msg }]);
                  handleSendLiveMessage(msg);
                }
              }}
              placeholder="Ask about TalkNex plans or speak into mic..."
              className="flex-1 px-2.5 py-1 text-xs bg-transparent text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (textInput.trim()) {
                  const msg = textInput.trim();
                  setTextInput('');
                  if (isUserRecordingRef.current) finishRecordingAndTranscribe();
                  setLiveTranscript((prev) => [...prev, { speaker: 'You', text: msg }]);
                  handleSendLiveMessage(msg);
                }
              }}
              className="p-1.5 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white transition-colors cursor-pointer"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PERSISTENT FLOATING TRIGGER BUTTON (TALKNEX BRANDED) */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => {
            const nextOpen = !isOpen;
            setIsOpen(nextOpen);
            if (nextOpen && !isLiveActive) {
              startLiveCall();
            } else if (!nextOpen && isLiveActive) {
              endLiveCall();
            }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-bold shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-slate-900 border border-slate-700 hover:bg-slate-800'
              : 'bg-[#4f46e5] hover:bg-[#4338ca] shadow-indigo-500/40'
          }`}
          aria-label="Talk to TalkNex AI"
        >
          <div className="relative">
            <Mic className="w-4 h-4" />
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#4f46e5] animate-ping" />
            )}
          </div>
          <span>{isOpen ? 'Close Call' : 'Talk to TalkNex AI'}</span>
        </button>
      </div>
    </>
  );
}