'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Bot,
  Sparkles,
  Languages,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Volume2,
  Cpu,
  Radio,
  Clock,
  Layers,
  Play,
  Pause,
  MessageSquare,
  Activity,
  Check
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function AiVoiceAgentsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'hinglish' | 'hindi' | 'gujarati' | 'english'>('hinglish');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'Sub-450ms End-to-End Latency',
      desc: 'Real-time streaming pipeline coupling edge speech-to-text, low-latency reasoning engines, and streaming neural text-to-speech for conversational flow without awkward pauses.',
      metric: '<450ms Latency',
      icon: Zap,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    },
    {
      title: '12+ Indian Languages & Hinglish',
      desc: 'Native comprehension of Hindi, Gujarati, Marathi, Tamil, Telugu, and English, with fluent recognition of code-mixed regional dialects and spontaneous switching.',
      metric: 'Bilingual Native',
      icon: Languages,
      color: 'bg-teal-50 text-teal-600 border-teal-200/80'
    },
    {
      title: 'Full-Duplex Interruption Handling',
      desc: 'Callers never wait for the bot to finish. The AI agent detects voice activity instantly, stops audio playback mid-word, and listens attentively.',
      metric: 'Zero Overlap',
      icon: Radio,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200/80'
    },
    {
      title: 'Dynamic Prosody & Emotional Nuance',
      desc: 'Neural voice synthesis infuses empathy, enthusiasm, and authentic conversational cadence tailored to whether the caller is frustrated or excited.',
      metric: 'Human Prosody',
      icon: Volume2,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80'
    },
    {
      title: 'Enterprise Knowledge RAG Engine',
      desc: 'Upload product catalogs, pricing PDFs, and FAQs. Agents query vector databases in real-time to answer factual queries without hallucinations.',
      metric: 'Zero Hallucinations',
      icon: Cpu,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80'
    },
    {
      title: 'TRAI & Carrier-Grade Telephony',
      desc: 'Native SIP trunking integration with Tata Tele, Airtel, Exotel, and Twilio with automated 140 commercial prefixes and DND scrubbing.',
      metric: '100% Compliant',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    }
  ];

  const dialogues = {
    hinglish: [
      { speaker: 'Caller', text: 'नमस्ते, मुझे आपके नए 3 BHK प्रोजेक्ट के बारे में जानकारी चाहिए थी। क्या कोई ब्रोशर मिल सकता है?', time: '00:03' },
      { speaker: 'TalkNex AI Agent', text: 'नमस्ते जी! बिल्कुल, हमारा नया प्रोजेक्ट \'ग्रीन हाइट्स\' एसजी हाईवे पर स्थित है, 3 BHK यूनिट्स 1.2 करोड़ से शुरू हैं। क्या मैं यह ब्रोशर आपके व्हाट्सएप नंबर पर भेज दूं?', time: '00:06' },
      { speaker: 'Caller', text: 'हां प्लीज भेज दीजिए। और क्या इस शनिवार को साइट विजिट पॉसिबल है?', time: '00:14' },
      { speaker: 'TalkNex AI Agent', text: 'बिल्कुल! मैंने ब्रोशर व्हाट्सएप पर भेज दिया है। शनिवार दोपहर 2 बजे या 4 बजे, कौन सा स्लॉट बुक करूं?', time: '00:18' }
    ],
    hindi: [
      { speaker: 'Caller', text: 'नमस्ते, क्या मुझे आपकी डॉक्टर कंसल्टेशन फीस और अपॉइंटमेंट के बारे में पता चल सकता है?', time: '00:03' },
      { speaker: 'TalkNex AI Agent', text: 'नमस्ते! डॉक्टर शर्मा की ओपीडी कंसल्टेशन फीस ₹800 है। कल सुबह 10:30 बजे का समय उपलब्ध है, क्या मैं बुक कर दूं?', time: '00:07' }
    ],
    gujarati: [
      { speaker: 'Caller', text: 'નમસ્તે, મારે તમારી નવી સ્કીમ અને વિઝિટના સમય વિશે જાણવું હતું.', time: '00:03' },
      { speaker: 'TalkNex AI Agent', text: 'નમસ્તે! અમારો નવો પ્રોજેક્ટ પ્રહલાદનગરમાં છે. શનિવાર બપોરે 3 વાગ્યે તમારી સાઇટ વિઝિટ બુક કરી આપું?', time: '00:07' }
    ],
    english: [
      { speaker: 'Caller', text: 'Hi, I saw your enterprise AI calling solution. Can it integrate with our HubSpot CRM?', time: '00:03' },
      { speaker: 'TalkNex AI Agent', text: 'Hello! Yes, TalkNex natively connects with HubSpot, syncing call recordings, transcripts, and BANT qualification scores in real time.', time: '00:07' }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= 1. PREMIUM HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-12 left-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Pitch & CTAs */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00f59b] mb-6 backdrop-blur-md">
                <Bot className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Next-Gen Speech &amp; Reasoning Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                Autonomous AI Voice Agents with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  Human Prosody
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Replace robotic IVRs. Deploy conversational voice agents that listen with active acoustic recognition, reason over your proprietary knowledge base, and speak with authentic human prosody in 12+ Indian languages.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">&lt;450ms</div>
                  <div className="text-[11px] text-slate-400 font-medium">Streaming Latency</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">12+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Indian Dialects</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">Full-Duplex</div>
                  <div className="text-[11px] text-slate-400 font-medium">Instant Interruption</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Experience Live Voice Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  View Pricing Plans
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive AI Speech Console Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a142e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live Call Console</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    340ms Latency
                  </span>
                </div>

                {/* Animated Waveform & Visualizer */}
                <div className="p-5 rounded-2xl bg-[#060b18] border border-white/5 mb-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="flex items-center gap-1.5 h-12 mb-3">
                    <div className="w-1.5 bg-[#00f59b] rounded-full wave-bar-1" />
                    <div className="w-1.5 bg-[#00f59b] rounded-full wave-bar-2" />
                    <div className="w-1.5 bg-[#00f59b] rounded-full wave-bar-3" />
                    <div className="w-1.5 bg-emerald-400 rounded-full wave-bar-4" />
                    <div className="w-1.5 bg-teal-400 rounded-full wave-bar-5" />
                    <div className="w-1.5 bg-[#00f59b] rounded-full wave-bar-6" />
                    <div className="w-1.5 bg-emerald-300 rounded-full wave-bar-2" />
                    <div className="w-1.5 bg-[#00f59b] rounded-full wave-bar-4" />
                  </div>
                  <div className="text-xs font-extrabold text-white">TalkNex Neural Voice Stream</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">Bilingual Synthesizer Active</div>
                </div>

                {/* Language Switcher Tabs */}
                <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 mb-4 text-[11px] font-bold">
                  {(['hinglish', 'hindi', 'gujarati', 'english'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`py-1.5 rounded-lg capitalize transition-all ${
                        selectedLang === lang
                          ? 'bg-[#00f59b] text-[#060b18] shadow-sm font-extrabold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                {/* Live Transcript Stream */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {dialogues[selectedLang].map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        line.speaker === 'Caller'
                          ? 'bg-white/5 border border-white/10 text-slate-200'
                          : 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span className={line.speaker === 'Caller' ? 'font-bold text-slate-300' : 'font-bold text-[#00f59b]'}>
                          {line.speaker}
                        </span>
                        <span>{line.time}</span>
                      </div>
                      <p>{line.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CAPABILITIES GRID WITH SCROLL POPUP ================= */}
      <section ref={sectionRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Comprehensive Speech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Built for Real Indian Business Conversations
          </h2>
          <p className="text-sm text-slate-600">
            Every layer of our voice intelligence pipeline is purpose-built to navigate regional accents, colloquial phrasing, and dynamic call interruptions.
          </p>
        </div>

        {/* 6 High-Impact Cards with Staggered Pop-Up on Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((f, i) => {
            const Icon = f.icon;
            const delayMs = 80 + i * 80;

            return (
              <div
                key={i}
                style={{
                  transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
                }}
                className={`group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${f.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-extrabold border border-slate-200">
                      {f.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Enterprise Feature</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 3. STREAMING AUDIO PIPELINE ARCHITECTURE ================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#060b18] text-white shadow-2xl mb-20 relative overflow-hidden bg-tech-grid border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00f59b] mb-2 block">
              Sub-Second Streaming Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How TalkNex AI Agents Process Audio in Real Time
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:border-emerald-400/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">01</div>
              <div className="text-white font-bold text-sm mb-2">Acoustic Ingestion</div>
              <p className="text-slate-400 leading-relaxed">Audio captured via SIP trunk with real-time echo cancellation and background noise filtering.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:border-emerald-400/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">02</div>
              <div className="text-white font-bold text-sm mb-2">Neural ASR</div>
              <p className="text-slate-400 leading-relaxed">Instant phoneme conversion into text tokens in ~120ms with regional Hindi and Gujarati tuning.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:border-emerald-400/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">03</div>
              <div className="text-white font-bold text-sm mb-2">Knowledge RAG</div>
              <p className="text-slate-400 leading-relaxed">Contextual querying against your uploaded PDFs, CRM records, and business guidelines.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:border-emerald-400/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">04</div>
              <div className="text-white font-bold text-sm mb-2">Streaming TTS</div>
              <p className="text-slate-400 leading-relaxed">Expressive prosodic audio chunks begin streaming to the caller before the sentence finishes generating.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Bottom CTA */}
      <CtaBanner />
    </div>
  );
}
