'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building, Send, CheckCircle2, AlertCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Real Estate',
    message: '',
    consent: true,
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: formData.industry,
        message: formData.message,
        consent: formData.consent,
        sourcePage: '/contact',
        honeypot: formData.honeypot
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]"></div>
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Enterprise Support & Sales</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Connect with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              TalkNex Voice Architects
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Have questions about regional Indian language accuracy, high-concurrency SIP trunking, or custom enterprise CRM workflows? Our voice engineers are ready to assist.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-emerald-400 font-bold">&lt; 2 Hours</span> Enterprise SLA
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span>Direct Technical Engineers</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-purple-400 font-bold">Pan-India</span> Onboarding Support
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Contact Layout */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Office & Corporate Details */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={100} className="space-y-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#060b18] text-white shadow-2xl relative overflow-hidden bg-tech-grid">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
                  Emperor Smart Solutions
                </span>
                <h2 className="text-2xl font-extrabold text-white mb-6">Headquarters & Offices</h2>

                <div className="space-y-6 text-xs sm:text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00f59b] shrink-0 border border-white/10">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Sales & Inquiries</div>
                      <a href="mailto:sales@talknex.com" className="font-bold text-white hover:text-[#00f59b] transition-colors">
                        sales@talknex.com
                      </a>
                      <div className="text-xs text-slate-400 font-medium mt-2">Technical Support</div>
                      <a href="mailto:support@talknex.com" className="font-bold text-white hover:text-[#00f59b] transition-colors">
                        support@talknex.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00f59b] shrink-0 border border-white/10">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Enterprise Helpline</div>
                      <div className="font-bold text-white">+91 98765 43210</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Monday – Friday: 9:00 AM – 7:00 PM IST</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#00f59b] shrink-0 border border-white/10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Gujarat Office</div>
                      <div className="font-semibold text-white">Emperor Smart Solutions HQ</div>
                      <div className="text-slate-400 text-xs">SG Highway, Ahmedabad, Gujarat 380054</div>

                      <div className="text-xs text-slate-400 font-medium mt-3">Karnataka Tech Hub</div>
                      <div className="font-semibold text-white">AI Research Lab</div>
                      <div className="text-slate-400 text-xs">Indiranagar, Bengaluru, Karnataka 560038</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Enterprise Data Privacy Guarantee</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All communications and audio metadata are processed with 256-bit AES encryption in compliance with Indian DPDP regulations.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={200}>
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card">
              {success ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Enquiry Received</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your inquiry has been securely persisted. A senior TalkNex voice architect will contact you within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        industry: 'Real Estate',
                        message: '',
                        consent: true,
                        honeypot: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
                      Send Us an Inquiry
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">
                      Fill out the form below. We persist all records directly to our secure database.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Honeypot field for bot filtering */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company / Organization *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Pvt Ltd"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Industry Vertical *</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Real Estate">Real Estate & Developers</option>
                      <option value="Healthcare">Healthcare & Clinics</option>
                      <option value="Education">Education & EdTech</option>
                      <option value="E-commerce">E-commerce & Retail</option>
                      <option value="Automotive">Automotive & Dealerships</option>
                      <option value="Manufacturing">Manufacturing & Logistics</option>
                      <option value="Hospitality">Hospitality & Travel</option>
                      <option value="Other">Other Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message or Use Case Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your call volumes, preferred Indian languages, and telephony systems..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-500 leading-relaxed">
                      I agree to allow Emperor Smart Solutions / TalkNex to contact me via phone or email regarding this inquiry. We respect your privacy and never sell data.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.consent}
                    className="w-full py-4 rounded-xl bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Submitting to Database...</span>
                    ) : (
                      <>
                        <span>Submit Enterprise Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
