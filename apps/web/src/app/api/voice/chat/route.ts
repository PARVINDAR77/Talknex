import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
// Prefer fast production models
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the friendly, intelligent AI Voice Representative for TalkNex (talknex.com).
You are on a live telephone voice call with a prospective client or business user.
You fluently understand and speak Hindi, Indian English, Hinglish, and Gujarati.

CONVERSATIONAL INTELLIGENCE & SHORT-TERM MEMORY:
1. Always maintain conversational continuity across the call. Remember the user's name, company, and questions discussed earlier in the dialogue.
2. When the user introduces themselves (e.g., "I am Karan", "Mera naam Karan hai", "Karan here"):
   - Greet them warmly and acknowledge their name: "Namaste Karan ji! TalkNex mein aapka swagat hai. Main aapke business calling ke liye kaise madad kar sakti hoon?"
   - Address them respectfully by their name in subsequent turns where natural.
3. Be adaptive, natural, and engaging:
   - Never repeatedly say "I am TalkNex AI" or repeat canned greetings once the conversation has started.
   - Always directly answer what the user asked before offering relevant follow-ups.

TALKNEX CORE KNOWLEDGE & BUSINESS BENEFITS:
1. What TalkNex Is:
   - TalkNex is India's leading enterprise AI voice SaaS platform that replaces manual telecallers with sub-500ms human-like conversational voice agents.
   - Omnichannel: Operates across Telephony (VoIP/SIP), WhatsApp Voice & Messaging, and SMS.
2. Core Business Benefits (Explain clearly when asked about benefits/fayde/features):
   - 70% Cost Reduction: Drastically lowers overhead compared to hiring, managing, and training human telecallers.
   - 24/7 Availability with 0 Wait Time: Never misses a customer lead or inbound inquiry.
   - Sub-500ms Human-Like Latency: Real-time natural turn-taking with pauses, breath sounds, and realistic voice inflections.
   - Multilingual Fluency: Native support for Hindi, Gujarati, and Indian English with regional accents.
   - Automatic CRM Integration: Instantly syncs call recordings, summaries, and demo bookings into HubSpot, Salesforce, Zoho, and Google Sheets.
3. Industry Use Cases:
   - Real Estate: Instant lead qualification from property portals, booking site visits.
   - Healthcare & Clinics: Scheduling doctor appointments, sending pre-op reminders.
   - E-commerce: Cash-on-Delivery (COD) order verification, address confirmation, cart recovery.
   - Finance & Collections: Automated EMI reminders, payment collection calls.
4. Pricing Plans:
   - Starter Plan: ₹4,999/month (1,200 calling minutes, sub-500ms latency, Hindi & English).
   - Growth Plan (Most Popular): ₹14,999/month (4,000 calling minutes, 3 custom voice personas, CRM integration).
   - Enterprise Plan: Custom pricing, unlimited scale, dedicated SIP trunks, custom voice fine-tuning.
5. Live Demo Scheduling:
   - Offer to schedule a live interactive demo (e.g., Thursday 5:00 PM slot) or start a free trial.

SPOKEN VOICE RULES:
- Reply naturally in the same language the user spoke (Hinglish, Hindi, or English).
- Keep replies concise, punchy, and conversational (1 to 3 short sentences maximum).
- Do NOT use markdown symbols (no asterisks, bullet points, headers, bolding, or URLs) because this will be read aloud over text-to-speech.
- Always sound warm, professional, energetic, and helpful.`;

function getTalkNexFallbackResponse(userText: string): string {
  const lower = (userText || '').toLowerCase();
  
  // Name introduction query
  if (lower.includes('naam') || lower.includes('i am') || lower.includes("i'm") || lower.includes('mera naam') || lower.includes('this is')) {
    const words = userText.trim().split(/\s+/);
    const candidateName = words[words.length - 1] || '';
    if (candidateName && candidateName.length > 2 && !['hoon', 'hun', 'hai', 'here'].includes(candidateName.toLowerCase())) {
      return `Namaste ${candidateName} ji! TalkNex mein aapka swagat hai. Boliye, main aapke business calls ke liye kaise madad kar sakti hoon?`;
    }
    return 'Namaste ji! TalkNex mein aapka swagat hai. Boliye main aapke business calls ke liye kaise madad kar sakti hoon?';
  }

  // Benefits / Advantages query
  if (lower.includes('benefit') || lower.includes('fayda') || lower.includes('fayde') || lower.includes('advantage') || lower.includes('kyu') || lower.includes('why')) {
    return 'TalkNex ke main benefits hain ki yeh aapke calling cost ko 70% tak kam karta hai, 24/7 zero-wait time calls handle karta hai, aur Hindi tatha English mein human-like conversation karta hai. Aapko inbound support ke liye chahiye ya outbound sales ke liye?';
  }

  // Pricing / Plans query
  if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('plan') || lower.includes('kitna') || lower.includes('rate') || lower.includes('paisa')) {
    return 'TalkNex ke plans ₹4,999 per month se shuru hote hain jisme 1,200 calling minutes aur sub-500ms latency milti hai. Aap kya janna chahte hain Starter ya Growth plan ke baare mein?';
  }
  
  // Demo / Trial query
  if (lower.includes('demo') || lower.includes('book') || lower.includes('appointment') || lower.includes('trial') || lower.includes('schedule')) {
    return 'Bilkul! Main aapka live TalkNex interactive demo schedule kar sakti hoon. Kya Thursday shaam 5:00 baje ka slot theek rahega?';
  }
  
  // Language query
  if (lower.includes('hindi') || lower.includes('gujarati') || lower.includes('language') || lower.includes('bhasha')) {
    return 'Ji haan! TalkNex native Hindi, Gujarati, aur Indian English seamlessly support karta hai regional accents ke saath.';
  }
  
  // Greetings / What is TalkNex
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste') || lower.includes('hey') || lower.includes('kya hai') || lower.includes('what is')) {
    return 'Namaste! TalkNex ek AI voice calling platform hai jo manual telecallers ko replace karke sub-500ms human-like calls karta hai. Boliye main aapki kya madad kar sakti hoon?';
  }

  // General helpful response
  return 'Main aapki TalkNex AI voice agents, plans, aur CRM integration ke baare mein poori madad kar sakti hoon. Aap kya janna chahte hain?';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

    const sanitizedMessages = messages.slice(-10).map((m: { role?: string; content?: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 2000)
    }));

    if (!GROQ_API_KEY) {
      return NextResponse.json({
        answer: getTalkNexFallbackResponse(lastUserMessage),
        model: 'talknex-direct-v1'
      });
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...sanitizedMessages],
          temperature: 0.6,
          max_completion_tokens: 220,
          stream: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (groqResponse.ok) {
        const payload = await groqResponse.json();
        const answer = payload?.choices?.[0]?.message?.content?.trim();
        if (answer) {
          return NextResponse.json({
            answer,
            model: payload.model || GROQ_MODEL
          });
        }
      }
    } catch (fetchErr) {
      console.warn('Groq fetch skipped, using smart telephony fallback:', fetchErr);
    }

    // High quality instant fallback if Groq timed out or network blocked
    return NextResponse.json({
      answer: getTalkNexFallbackResponse(lastUserMessage),
      model: 'talknex-instant-v1'
    });
  } catch (error) {
    console.error('Voice chat route error:', error);
    return NextResponse.json(
      { answer: 'Namaste! Main TalkNex AI voice assistant bol rahi hoon. Boliye main aapki kya madad kar sakti hoon?', model: 'fallback' },
      { status: 200 }
    );
  }
}
