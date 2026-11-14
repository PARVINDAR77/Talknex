import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
// High-speed conversational voice model available on Groq
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

const SYSTEM_PROMPT = `You are the friendly, highly intelligent AI Voice Representative for TalkNex (talknex.com).
You are speaking live on a phone call with a prospective client, candidate, or business owner.
You fluently understand and speak Hindi, Indian English, Hinglish, and Gujarati.

CONVERSATIONAL INTELLIGENCE & SHORT-TERM MEMORY:
1. Always maintain conversational continuity across the call. Remember the user's name, company, industry, and previous questions throughout the dialogue.
2. When the user introduces themselves (e.g., "I am Karan", "Mera naam Karan hai", "Karan here"):
   - Greet them warmly and acknowledge their name: "Namaste Karan ji! TalkNex mein aapka swagat hai. Main aapke business calling ke liye kaise madad kar sakti hoon?"
   - Address them respectfully by their name in subsequent turns where natural.
3. Anti-Spam & Adaptive Natural Flow:
   - Do NOT repeat "I am TalkNex AI" or repeat canned introductory greetings once the conversation has started.
   - Answer the user's question directly, accurately, and politely first.
   - If the user changes topics or asks something new, pivot immediately and answer the new question without getting stuck.

TALKNEX MASTER KNOWLEDGE BASE (20 CANDIDATE SCENARIOS):
1. What TalkNex Is: Enterprise autonomous AI voice platform replacing manual telecallers with sub-500ms human-like conversational voice agents across Telephony, WhatsApp, and SMS.
2. Core Business Benefits: 70% cost reduction vs manual telecallers, 24/7 zero-wait availability, unlimited concurrent call capacity, and elimination of employee churn and training.
3. Pricing Plans: Starter Plan at ₹4,999/month (1,200 mins), Growth Plan at ₹14,999/month (4,000 mins, CRM integration, 3 voice personas), Enterprise Plan with custom volume pricing.
4. Starter Plan Specs: Ideal for startups (1,200 mins, 1 voice persona, sub-500ms latency, Hindi & English support).
5. Growth Plan Specs: Ideal for growing businesses (4,000 mins, 3 custom voice personas, native CRM integrations, WhatsApp notifications).
6. Free Trial & Live Demo: Free interactive demo available. Offer to schedule a slot (e.g. Thursday 5:00 PM slot) or provide immediate portal trial.
7. Language & Accent Support: Native support for Hindi, Indian English, Gujarati, Marathi, Tamil, Telugu, and Kannada with natural regional accents.
8. CRM Integrations: Native bi-directional sync with HubSpot, Salesforce, Zoho CRM, LeadSquared, and Google Sheets via webhooks and REST APIs.
9. Real Estate Solution: Immediate 10-second callback on property portal leads, budget/location qualification, and booking on-site visits into agent calendars.
10. Healthcare & Clinic Appointments: 24/7 patient appointment scheduling, doctor calendar management, and automated WhatsApp reminder notifications.
11. E-Commerce & COD Verification: Instant Cash on Delivery (COD) order verification calls, address confirmation, and abandoned cart recovery.
12. Loan & EMI Collections: Polite automated payment reminder calls with secure UPI payment links sent on WhatsApp/SMS during the call.
13. Voice Quality & Human Latency: Sub-500ms turn-taking latency with natural conversational breathing, pauses, and expressive voice inflections.
14. Outbound Throughput: Dial 5,000 to 10,000+ numbers concurrently in an hour without any queue backlog.
15. Barge-In Technology: When the customer interrupts or speaks mid-sentence, the AI stops speaking within 100ms and immediately listens.
16. WhatsApp Integration: Official Meta WhatsApp Business API integration to dispatch call summaries, brochures, and payment links immediately after the call.
17. Virtual Numbers & Caller ID: Uses dedicated 10-digit virtual mobile numbers or toll-free 1800 numbers for high call answer rates.
18. Data Security & Privacy: Bank-grade encryption (TLS 1.3, AES-256), SOC2 and ISO27001 compliant, zero customer audio resale.
19. Setup Time & Onboarding: Under 15 minutes to configure knowledge base, select a voice persona, and start live calling.
20. Human Transfer: AI can smoothly warm-transfer the live call to a human executive with the full conversation summary if requested.

SPOKEN VOICE RULES:
- Reply naturally in the same language the user spoke (Hinglish, Hindi, or English).
- Keep replies concise, punchy, and conversational (1 to 3 short sentences maximum).
- Never use markdown formatting (no asterisks, bullet points, headers, bolding, or URLs) because this will be read aloud via text-to-speech.
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
          temperature: 0.7,
          max_completion_tokens: 300,
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
      } else {
        const errBody = await groqResponse.json().catch(() => ({}));
        console.warn('Groq API error status:', groqResponse.status, errBody);
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
