'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Volume2, Sparkles, Radio, CheckCircle2 } from 'lucide-react';

export function AudioActionCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const duration = 84; // 1:24 in seconds

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      // Play connect chime and speak sample audio
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') ctx.resume();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.1);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        }
      } catch {}

      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.resume();
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(
            'नमस्ते! टॉकनेक्स एआई में आपका स्वागत है। हमारे पास 2 BHK और 3 BHK अपार्टमेंट्स उपलब्ध हैं। क्या आप साइट विजिट बुक करना चाहेंगे?'
          );
          utterance.rate = 0.95;
          utterance.lang = 'hi-IN';
          const voices = window.speechSynthesis.getVoices();
          const hindiVoice = voices.find((v) => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'));
          if (hindiVoice) utterance.voice = hindiVoice;
          utterance.onend = () => {
            // keep progress running or loop
          };
          window.speechSynthesis.speak(utterance);
        } catch {}
      }

      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      clearInterval(timer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.round((currentTime / duration) * 100));

  return (
    <div
      ref={cardRef}
      style={{
        transitionDuration: '650ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)'
      }}
      className={`rounded-3xl bg-gradient-to-br from-[#0c1630] via-[#070d1e] to-[#040813] border border-white/15 p-6 sm:p-7 text-white flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-500 group ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      {/* Ambient Neon Glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-[#00f59b] shadow-sm">
            <Radio className="w-3 h-3 text-[#00f59b] animate-pulse" />
            <span>Interactive Voice Demo</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {formatTime(currentTime)} / 1:24
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1.5">
          Hear It in Action
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
          Listen to an autonomous TalkNex AI agent conducting a natural bilingual conversation.
        </p>
      </div>

      {/* Center Soundwave Visualizer with Live Pulsing Rings */}
      <div className="relative z-10 py-6 my-2 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center gap-3">
          {/* Animated Left Wave Bars */}
          <div className="flex items-center gap-1 h-14">
            <span className={`w-1 bg-[#00f59b] rounded-full transition-all ${isPlaying ? 'wave-bar-1' : 'h-3'}`}></span>
            <span className={`w-1 bg-[#00f59b] rounded-full transition-all ${isPlaying ? 'wave-bar-2' : 'h-8'}`}></span>
            <span className={`w-1 bg-[#00f59b] rounded-full transition-all ${isPlaying ? 'wave-bar-3' : 'h-5'}`}></span>
            <span className={`w-1 bg-[#00f59b] rounded-full transition-all ${isPlaying ? 'wave-bar-4' : 'h-11'}`}></span>
            <span className={`w-1 bg-[#00f59b] rounded-full transition-all ${isPlaying ? 'wave-bar-5' : 'h-6'}`}></span>
          </div>

          {/* Center Microphone Sphere with Radial Echo Rings */}
          <div className="relative">
            {isPlaying && (
              <span className="absolute -inset-2 rounded-full border-2 border-[#00f59b]/40 animate-ping pointer-events-none"></span>
            )}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-[#00f59b] text-[#00f59b] flex items-center justify-center shadow-[0_0_25px_rgba(0,245,155,0.4)] transition-transform duration-300 group-hover:scale-105">
              <Mic className="w-7 h-7" />
            </div>
          </div>

          {/* Animated Right Wave Bars */}
          <div className="flex items-center gap-1 h-14">
            <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isPlaying ? 'wave-bar-5' : 'h-7'}`}></span>
            <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isPlaying ? 'wave-bar-4' : 'h-12'}`}></span>
            <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isPlaying ? 'wave-bar-3' : 'h-6'}`}></span>
            <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isPlaying ? 'wave-bar-2' : 'h-9'}`}></span>
            <span className={`w-1 bg-cyan-400 rounded-full transition-all ${isPlaying ? 'wave-bar-1' : 'h-4'}`}></span>
          </div>
        </div>

        {/* Live Audio Progress Bar */}
        <div className="w-full mt-5">
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00f59b] to-cyan-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Transcript Dialogue Snippet */}
        <div className="w-full mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-left">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#00f59b] mb-0.5">
            {isPlaying ? 'Live Speech Transcript' : 'Sample Dialogue'}
          </div>
          <p className="text-xs text-slate-200 italic line-clamp-1">
            {isPlaying
              ? 'नमस्ते! हमारे पास 2 BHK और 3 BHK अपार्टमेंट्स उपलब्ध हैं। क्या आप अपना बजट बताना चाहेंगे?'
              : '"नमस्ते! क्या आप मुझे प्रोजेक्ट के बारे में जानकारी दे सकते हैं?"'}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs font-bold transition-all transform hover:scale-105 shadow-glow"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? `Pause (${formatTime(currentTime)})` : 'Play Demo (1:24)'}</span>
        </button>

        <div className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-[#00f59b]" />
          <span>Bilingual Audio</span>
        </div>
      </div>
    </div>
  );
}
