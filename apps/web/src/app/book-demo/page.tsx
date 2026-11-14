'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Languages,
  Bot,
  ShieldCheck,
  PhoneCall,
  Building2,
  User,
  Mail,
  Phone,
  Volume2,
  Check,
  Headphones,
  Zap,
  Award,
  Radio,
  Square
} from 'lucide-react';
import { api } from '../../services/api';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

function parseDateCard(dateStr: string, fallbackDay?: string) {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const fullWeekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    return {
      dayOfWeek: fallbackDay || dayOfWeek,
      dayNumber: day,
      monthName,
      fullWeekday,
      year,
      formattedLabel: `${fullWeekday}, ${day} ${monthName} ${year}`
    };
  } catch {
    return {
      dayOfWeek: fallbackDay || 'Date',
      dayNumber: 1,
      monthName: '',
      fullWeekday: fallbackDay || '',
      year: 2026,
      formattedLabel: dateStr
    };
  }
}

function getSlotPeriod(slot: string): 'Morning' | 'Afternoon' | 'Evening' {
  if (slot.includes('AM')) return 'Morning';
  const hour = parseInt(slot.split(':')[0], 10);
  if (hour < 5 || hour === 12) return 'Afternoon';
  return 'Evening';
}

const DEMO_LANGUAGES = [
  { id: 'Hindi', label: 'Hindi', native: 'हिंदी' },
  { id: 'Indian English', label: 'Indian English', native: 'English' },
  { id: 'Hinglish', label: 'Hinglish', native: 'Hindi + Eng' },
  { id: 'Gujarati', label: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'Marathi', label: 'Marathi', native: 'मराठी' }
];

const CALL_VOLUMES = [
  '< 5,000 mins/mo',
  '5K – 25K mins/mo',
  '25K – 100K mins/mo',
  '100K+ mins (Enterprise)'
];

const AUDIO_SAMPLES = [
  {
    lang: 'Hindi',
    native: 'हिंदी',
    langCode: 'hi-IN',
    text: 'नमस्ते! मैं टॉकनेक्स एआई बोल रही हूँ। क्या आप रियल एस्टेट साइट विजिट बुक करना चाहते हैं?'
  },
  {
    lang: 'Indian English',
    native: 'English',
    langCode: 'en-IN',
    text: 'Hello! I am calling from TalkNex AI. I noticed your interest in automating outbound sales calls.'
  },
  {
    lang: 'Gujarati',
    native: 'ગુજરાતી',
    langCode: 'gu-IN',
    text: 'નમસ્તે! હું ટૉકનેક્સ એઆઇ તરફથી વાત કરું છું. તમારી હેલ્થકેર એપોઇન્ટમેન્ટ કન્ફર્મ કરવા કૉલ કર્યો છે.'
  }
];

export default function BookDemoPage() {
  const [availability, setAvailability] = useState<{
    timeZone: string;
    availableDates: Array<{ date: string; dayName: string; slots: string[] }>;
  }>({
    timeZone: 'Asia/Kolkata (IST)',
    availableDates: [
      { date: '2026-11-14', dayName: 'Sat', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-16', dayName: 'Mon', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-17', dayName: 'Tue', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-18', dayName: 'Wed', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-19', dayName: 'Thu', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-20', dayName: 'Fri', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-21', dayName: 'Sat', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-23', dayName: 'Mon', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-24', dayName: 'Tue', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] },
      { date: '2026-11-25', dayName: 'Wed', slots: ['10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'] }
    ]
  });

  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Hindi');
  const [selectedVolume, setSelectedVolume] = useState<string>('5K – 25K mins/mo');
  const [activeAudioSample, setActiveAudioSample] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Real Estate',
    requirements: '',
    consent: true,
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAvailability() {
      try {
        const data = await api.getDemoAvailability();
        if (data && Array.isArray(data.availableDates) && data.availableDates.length > 0) {
          setAvailability(data);
          setSelectedDate(data.availableDates[0].date);
          if (data.availableDates[0].slots && data.availableDates[0].slots.length > 0) {
            setSelectedSlot(data.availableDates[0].slots[0]);
          }
        }
      } catch {
        // Fallback initialized in state
      }
    }
    loadAvailability();
  }, []);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      try {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setVoices(v);
        }
      } catch {}
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch {}
    };
  }, []);

  const playTelephonyChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // First Tone: 523Hz (C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.12);

      // Second Tone: 784Hz (G5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1);
      gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.1);
      osc2.stop(ctx.currentTime + 0.32);
    } catch {}
  };

  const handleStopAudio = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
    setIsPlayingAudio(false);
  };

  const handlePlayAudio = (idx?: number) => {
    if (typeof window === 'undefined') return;

    const targetIdx = typeof idx === 'number' ? idx : activeAudioSample;
    const sample = AUDIO_SAMPLES[targetIdx];

    // If already playing this exact sample, toggle off
    if (isPlayingAudio && targetIdx === activeAudioSample) {
      handleStopAudio();
      return;
    }

    // Stop previous audio
    handleStopAudio();

    setActiveAudioSample(targetIdx);
    setIsPlayingAudio(true);

    // Play audible telephony pick-up chime
    playTelephonyChime();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(sample.text);
          utterance.rate = 0.95;
          utterance.pitch = 1.05;

          const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();

          let selectedVoice: SpeechSynthesisVoice | undefined;
          if (sample.langCode === 'hi-IN') {
            selectedVoice = currentVoices.find(
              (v) =>
                v.lang.toLowerCase().includes('hi') ||
                v.name.toLowerCase().includes('hindi') ||
                v.name.includes('Swara') ||
                v.name.includes('Kalpana')
            );
          } else if (sample.langCode === 'en-IN') {
            selectedVoice = currentVoices.find(
              (v) =>
                v.lang.toLowerCase() === 'en-in' ||
                v.name.toLowerCase().includes('india') ||
                v.name.includes('Neerja') ||
                v.name.includes('Ravi')
            );
          } else if (sample.langCode === 'gu-IN') {
            selectedVoice = currentVoices.find(
              (v) =>
                v.lang.toLowerCase().includes('gu') ||
                v.name.toLowerCase().includes('gujarati')
            );
            if (!selectedVoice) {
              selectedVoice = currentVoices.find(
                (v) => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi')
              );
            }
          }

          if (!selectedVoice) {
            selectedVoice = currentVoices.find((v) => v.lang.startsWith('en')) || currentVoices[0];
          }

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          utterance.lang = sample.langCode;

          utterance.onstart = () => {
            setIsPlayingAudio(true);
          };

          utterance.onend = () => {
            setIsPlayingAudio(false);
          };

          utterance.onerror = () => {
            setIsPlayingAudio(false);
          };

          speechRef.current = utterance;
          window.speechSynthesis.speak(utterance);
        }, 120);
      } catch {
        setTimeout(() => setIsPlayingAudio(false), 3500);
      }
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setError('Please select a demonstration date and time slot.');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please provide a valid phone number for the live voice demonstration.');
      return;
    }

    setError(null);
    setLoading(true);

    const fullRequirements = [
      `Language preference: ${selectedLanguage}`,
      `Expected Volume: ${selectedVolume}`,
      formData.requirements ? `Notes: ${formData.requirements}` : ''
    ]
      .filter(Boolean)
      .join(' | ');

    try {
      await api.submitDemoBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone.startsWith('+91') ? formData.phone : `+91 ${formData.phone}`,
        company: formData.company,
        industry: formData.industry,
        preferredDate: selectedDate,
        preferredTime: selectedSlot,
        timeZone: availability.timeZone,
        requirements: fullRequirements,
        consent: formData.consent,
        honeypot: formData.honeypot
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to schedule demo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentDateObj = availability.availableDates.find((d) => d.date === selectedDate);
  const currentFormatted = parseDateCard(selectedDate, currentDateObj?.dayName);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 1-on-1 AI Telephony Session</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Book a Live TalkNex{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                Voice Demonstration
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              Experience autonomous conversational AI live on your phone. See sub-500ms speech response, natural turn-taking, and native Indian multilingual comprehension tailored to your workflows.
            </p>
          </ScrollReveal>

          {/* Quick Stats Pill Strip */}
          <ScrollReveal direction="up" delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-slate-300">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#00f59b]" />
                <span><strong className="text-white">Live Phone Call</strong> to Your Number</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
                <Headphones className="w-3.5 h-3.5 text-cyan-400" />
                <span><strong className="text-white">Senior Voice Architect</strong> 1-on-1</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
                <Languages className="w-3.5 h-3.5 text-purple-400" />
                <span><strong className="text-white">Hindi • English • Gujarati</strong> Benchmarks</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Interactive Booking Interface */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Session Overview, Interactive Audio Preview, & Enterprise Trust */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="right" delay={100} className="space-y-6">
              {/* Main Dark Overview Card */}
              <div
                style={{ backgroundColor: '#060b18' }}
                className="p-8 rounded-3xl bg-[#060b18] text-white border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden bg-tech-grid"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-widest text-[#00f59b]">
                    <Zap className="w-3 h-3" />
                    <span>Live 30-Min Agenda</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Complimentary • No Pitch
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                  What Happens in Your Live Demo?
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Unlike traditional slide presentations, we spend 80% of the session placing live phone calls and inspecting production latency.
                </p>

                {/* 3 Step Interactive Timeline */}
                <div className="space-y-5 text-xs">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[#00f59b] flex items-center justify-center font-mono font-bold shrink-0 group-hover:scale-105 group-hover:bg-[#00f59b] group-hover:text-[#060b18] transition-all">
                      01
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <span>Live Phone Call to Your Device</span>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          Min 0–10
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Our AI calls your phone live. Test interruptions mid-sentence, speak colloquial Hinglish, and test background noise handling.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold shrink-0 group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-[#060b18] transition-all">
                      02
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <span>Custom Industry Script Run</span>
                        <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                          Min 10–20
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        We configure your specific business scenario—real estate lead qualification, clinic appointment booking, or COD confirmation.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-mono font-bold shrink-0 group-hover:scale-105 group-hover:bg-purple-400 group-hover:text-[#060b18] transition-all">
                      03
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                        <span>SIP, CRM &amp; Commercial Review</span>
                        <span className="text-[10px] font-semibold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">
                          Min 20–30
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Connect your carrier SIP trunk, review CRM webhooks (Zoho, HubSpot, Salesforce), and map minute pricing with zero guesswork.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Voice Architect Host Card */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-[#060b18] flex items-center justify-center text-white font-bold">
                      <Bot className="w-6 h-6 text-[#00f59b]" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>TalkNex Telephony Engineering Team</span>
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Conducted directly by Senior AI Solutions Architects
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                      ★★★★★ 4.9/5 from 2,400+ Enterprise Sessions
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Audio Preview Widget */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Sample Voice Preview (Indian Accents)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    Sub-500ms
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Listen to how natural and human-like our voice agents sound before booking:
                </p>

                {/* Language Audio Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {AUDIO_SAMPLES.map((sample, idx) => (
                    <button
                      key={sample.lang}
                      type="button"
                      onClick={() => handlePlayAudio(idx)}
                      className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                        activeAudioSample === idx
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs ring-1 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-medium">{sample.native}</div>
                      <div className="text-[11px] font-bold mt-0.5 truncate flex items-center justify-center gap-1">
                        {isPlayingAudio && activeAudioSample === idx && (
                          <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
                        )}
                        <span>{sample.lang}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Simulated Audio Player Box */}
                <div className="p-4 rounded-2xl bg-[#060b18] text-white border border-emerald-500/30 relative overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#00f59b] flex items-center gap-1.5">
                      <Radio className={`w-3 h-3 ${isPlayingAudio ? 'animate-pulse text-[#00f59b]' : 'text-slate-500'}`} />
                      <span>{isPlayingAudio ? `● Live Voice (${AUDIO_SAMPLES[activeAudioSample].lang})...` : 'Interactive AI Voice'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Sub-500ms Turn-Taking
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 italic leading-relaxed mb-3.5">
                    &ldquo;{AUDIO_SAMPLES[activeAudioSample].text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(activeAudioSample)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                          : 'bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] shadow-emerald-500/20'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Stop Voice</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Play Audio ({AUDIO_SAMPLES[activeAudioSample].lang})</span>
                        </>
                      )}
                    </button>

                    {/* Animated Equalizer Bars */}
                    <div className="flex items-end gap-1 h-5">
                      {[14, 22, 10, 20, 12, 24, 16, 22, 11].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full bg-[#00f59b] transition-all duration-200 ${
                            isPlayingAudio ? 'animate-pulse' : 'opacity-30'
                          }`}
                          style={{
                            height: isPlayingAudio ? `${(h * 1.5) % 20 + 4}px` : '4px'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Device Volume Hint */}
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>🔊 Turn up volume to hear AI speak</span>
                    {isPlayingAudio && (
                      <span className="text-[#00f59b] font-bold animate-pulse">● Audio Active</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card space-y-3">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise Compliance &amp; Guarantees</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>TRAI 140 Compliant</span>
                  </div>
                  <div className="flex-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>DPDP Act AES-256</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Zero Credit Card Needed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>100% Free Consultation</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Premium Booking Console */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={200}>
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card">
                {success ? (
                  /* Success Confirmation Screen */
                  <div className="text-center py-10 space-y-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50">
                      <CheckCircle2 className="w-11 h-11" />
                    </div>

                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                        Demonstration Reserved
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        We Look Forward to Calling You!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mt-2">
                        Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your 1-on-1 live voice demonstration is confirmed.
                      </p>
                    </div>

                    {/* Confirmed Details Card */}
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-xs text-slate-500">Date &amp; Time:</span>
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          {currentFormatted.formattedLabel} • {selectedSlot} IST
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-xs text-slate-500">Phone to Call:</span>
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          {formData.phone}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <span className="text-xs text-slate-500">Language Test:</span>
                        <span className="text-xs font-bold text-slate-900">
                          {selectedLanguage}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Session Host:</span>
                        <span className="text-xs font-bold text-emerald-600">
                          Senior AI Voice Architect
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      A calendar invitation and WhatsApp notification have been sent to your contact details. Please ensure you answer when our verified AI caller connects!
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          industry: 'Real Estate',
                          requirements: '',
                          consent: true,
                          honeypot: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Schedule Another Demonstration
                    </button>
                  </div>
                ) : (
                  /* Interactive Booking Form */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header with Step Indicator */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                          Select Demonstration Slot
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Times displayed in <strong className="text-slate-700">{availability.timeZone}</strong>
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-auto">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>30 Min Session</span>
                      </div>
                    </div>

                    {error && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Step 1: Date Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>1. Select Date (Next 10 Business Days)</span>
                        </label>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {currentFormatted.monthName} {currentFormatted.year}
                        </span>
                      </div>

                      {/* 5-Column Symmetrical Grid (2 Rows of 5) */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                        {availability.availableDates.map((d, idx) => {
                          const dateMeta = parseDateCard(d.date, d.dayName);
                          const isSelected = selectedDate === d.date;

                          return (
                            <button
                              key={d.date}
                              type="button"
                              onClick={() => {
                                setSelectedDate(d.date);
                                if (d.slots && d.slots.length > 0) {
                                  setSelectedSlot(d.slots[0]);
                                }
                              }}
                              className={`relative p-3 rounded-2xl border text-center transition-all duration-200 group cursor-pointer ${
                                isSelected
                                  ? 'bg-[#060b18] text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20 -translate-y-0.5'
                                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-emerald-300 hover:bg-slate-50'
                              }`}
                            >
                              {idx === 0 && (
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#00f59b] text-[#060b18] text-[9px] font-extrabold tracking-wider uppercase whitespace-nowrap shadow-xs">
                                  Earliest
                                </span>
                              )}
                              <div
                                className={`text-[11px] font-bold uppercase tracking-wider ${
                                  isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-600'
                                }`}
                              >
                                {dateMeta.dayOfWeek}
                              </div>
                              <div
                                className={`text-xl font-extrabold my-0.5 tracking-tight ${
                                  isSelected ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {dateMeta.dayNumber}
                              </div>
                              <div
                                className={`text-[10px] font-semibold ${
                                  isSelected ? 'text-slate-300' : 'text-slate-400'
                                }`}
                              >
                                {dateMeta.monthName}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Time Slot Radio Grid */}
                    {currentDateObj && (
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            <span>2. Select Time Slot (IST)</span>
                          </label>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {currentDateObj.slots.length} Slots Available
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {currentDateObj.slots.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            const period = getSlotPeriod(slot);

                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`py-3 px-3.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#00f59b] text-[#060b18] border-[#00f59b] font-extrabold shadow-sm -translate-y-0.5'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-slate-50 font-medium'
                                }`}
                              >
                                <span className="text-xs tracking-tight">{slot}</span>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                                    isSelected
                                      ? 'bg-[#060b18] text-[#00f59b]'
                                      : 'bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  {period}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Live Selected Slot Preview Banner */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-[#00f59b] text-[#060b18] flex items-center justify-center shrink-0 font-bold">
                          <Check className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {currentFormatted.formattedLabel} • {selectedSlot} (IST)
                          </div>
                          <div className="text-[11px] text-slate-600 truncate">
                            Live Voice Test Call Included • 30 Minutes
                          </div>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                        Active Slot
                      </span>
                    </div>

                    {/* Step 3: Contact & Voice Configuration Form */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        3. Contact &amp; Demonstration Details
                      </div>

                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Your Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="e.g. Rakesh Patel"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Work Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="rakesh@company.com"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Phone Number to Call Live <span className="text-rose-500">*</span>
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-700 text-xs font-bold">
                              🇮🇳 +91
                            </span>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="98765 43210"
                              className="w-full px-4 py-2.5 rounded-r-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                          <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
                            Our AI will place a test call to this exact number during your slot.
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Company / Brand Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder="Apex Realty Pvt Ltd"
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Primary Industry */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Industry <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white"
                        >
                          <option value="Real Estate">Real Estate &amp; Property Developers (Site visits &amp; leads)</option>
                          <option value="Healthcare">Healthcare &amp; Hospitals (Patient reminders &amp; bookings)</option>
                          <option value="Education">Education &amp; EdTech (Admissions counselling &amp; fees)</option>
                          <option value="E-commerce">E-commerce &amp; D2C (COD verification &amp; returns)</option>
                          <option value="Automotive">Automotive Dealerships (Test drives &amp; service renewals)</option>
                          <option value="Banking & Finance">Banking, Lending &amp; Insurance (Loan qualification)</option>
                          <option value="Hospitality">Hotels &amp; Travel (Reservation enquiries)</option>
                          <option value="Other">Other Enterprise Workflow</option>
                        </select>
                      </div>

                      {/* Preferred Demo Language */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Preferred AI Demonstration Language
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {DEMO_LANGUAGES.map((lang) => (
                            <button
                              key={lang.id}
                              type="button"
                              onClick={() => setSelectedLanguage(lang.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                                selectedLanguage === lang.id
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{lang.label}</span>
                              <span className="text-[10px] opacity-70 ml-1">({lang.native})</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Monthly Call Volume Expectation */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Estimated Monthly Calling Volume
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {CALL_VOLUMES.map((vol) => (
                            <button
                              key={vol}
                              type="button"
                              onClick={() => setSelectedVolume(vol)}
                              className={`py-2 px-2.5 rounded-xl text-center border text-[11px] font-medium transition-all ${
                                selectedVolume === vol
                                  ? 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold'
                                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {vol}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Specific Requirements / Notes */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Specific Workflows or Integrations to Test (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          placeholder="e.g. We want to test Zoho CRM webhook sync and handling interruptions in Hindi..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={loading || !selectedDate || !selectedSlot}
                      className="w-full py-4 px-6 rounded-2xl bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-extrabold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-[#060b18] border-t-transparent rounded-full animate-spin" />
                          <span>Locking in Your Demonstration Slot...</span>
                        </div>
                      ) : (
                        <>
                          <span>
                            Lock In Live Demo on {currentFormatted.dayOfWeek}, {currentFormatted.dayNumber} {currentFormatted.monthName} ({selectedSlot} IST)
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-500">
                      🔒 No credit card required. Confirmation and Google / Outlook calendar invite dispatched immediately.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner />
    </div>
  );
}
