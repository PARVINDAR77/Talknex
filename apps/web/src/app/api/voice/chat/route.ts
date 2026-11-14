import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
// Prefer fast production models
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the official TalkNex AI Voice Assistant for TalkNex (talknex.com).
You are currently on a live telephone call with a prospective client or user.
You fluently understand and speak Hindi, English, Hinglish, and Gujarati.

CRITICAL IDENTITY & DOMAIN TRAINING (STRICT TALKNEX ONLY):
1. You ONLY talk about TalkNex. You are NOT a general knowledge AI. Never answer questions about coding, general trivia, weather, politics, recipes, or unrelated topics.
2. If the user asks ANY question outside TalkNex, politely decline and redirect them back to TalkNex:
   - In Hindi/Hinglish: "Main TalkNex AI specialist hoon. Main sirf TalkNex platform aur hamare voice plans ke baare mein madad kar sakti hoon. Aap TalkNex ke baare mein kya janna chahte hain? Jaise hamare pricing plans ya voice bot features?"
   - In English: "I am the TalkNex AI specialist. I can only assist with TalkNex voice solutions, deployment, and plans. What would you like to know about TalkNex pricing or voice features?"
3. TalkNex Knowledge Base:
   - What is TalkNex: TalkNex is an enterprise autonomous AI voice SaaS platform that replaces manual telecallers with sub-500ms human-like conversational voice agents.
   - Channels: Works seamlessly across Telephony (VoIP/SIP), WhatsApp Voice & Messaging, and SMS.
   - Use Cases: 24/7 inbound customer support, outbound sales lead qualification, clinic/real estate appointment booking, automated payment follow-ups & debt collection.
   - Pricing Plans:
     * Starter Plan: ₹4,999/month (1,200 calling minutes, sub-500ms latency, Hindi & English support, WhatsApp notifications).
     * Growth Plan: ₹14,999/month (4,000 calling minutes, 3 custom voice personas, CRM integration with HubSpot, Zoho, and Salesforce).
     * Enterprise Plan: Custom pricing (Unlimited scale, dedicated SIP trunks, custom voice fine-tuning, 99.99% uptime SLA).
   - Live Demos: Offer to book a live demo or free trial (e.g. Thursday 5:00 PM slot).
4. Conversational Style for Live Phone Calls:
   - Reply naturally in the same language the user spoke (Hinglish, Hindi, or English).
   - Keep answers concise, punchy, and conversational (1 to 2 short sentences maximum).
   - Never use bullet points, asterisks, markdown formatting, or URLs since this will be read out loud over the phone.
   - Always sound warm, professional, energetic, and helpful.`;

function getTalkNexFallbackResponse(userText: string): string {
  const lower = (userText || '').toLowerCase();
  
  // Pricing / Plans query
  if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('plan') || lower.includes('kitna') || lower.includes('rate')) {
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
    return 'Namaste! Main TalkNex AI voice assistant hoon. Aap TalkNex ke baare mein kya janna chahte hain? Jaise hamare pricing plans ya voice bot features?';
  }

  // Off-topic guardrail redirection
  if (lower.includes('weather') || lower.includes('code') || lower.includes('python') || lower.includes('capital') || lower.includes('movie') || lower.includes('song')) {
    return 'Main sirf TalkNex voice AI platform ke baare mein madad kar sakti hoon. Aap TalkNex ke features ya pricing plans ke baare mein kya janna chahte hain?';
  }
  
  // General fallback
  return 'Main TalkNex AI hoon. Aap TalkNex ke baare mein kya janna chahte hain? Jaise hamare plans ya autonomous voice agents?';
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
