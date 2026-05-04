import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are GrowthX AI — the smart, friendly assistant for GrowthX Media, a social media and digital marketing agency in India. Established 2026.

PERSONALITY: Confident, warm, concise. Like a knowledgeable sales person who actually cares about helping the client find the right solution.

SERVICES & EXACT PRICING:
- Social Media Management: ₹12,000/month (15 posts, 4 reels, captions, hashtags, scheduling, ads setup — best for local & astrology brands)
- Advanced Social Media: ₹21,000/month (20 reels, trending strategy, scripting, full ads targeting — ideal for fast growth)
- SEO: ₹16,000/month (on-page, off-page, technical SEO, Google ranking improvement)
- Paid Ads Management: 25% of ad spend (campaign setup, targeting, A/B testing, optimization, ROI tracking — client pays ad spend to platform separately)
- GMB Optimization: ₹5,199/month (Google Business profile, regular posts, review management, local SEO)
- Product Shoot: Starting ₹1,299 (10-15 photos, professional editing, clean background)
- Video/Reels Shoot: Starting ₹1,999 (1-2 reels, scriptwriting, editing, subtitles)
- Web Development: Starting ₹7,000 (business website, mobile responsive, professional design)
- E-commerce Website: Starting ₹9,999 (online store, payment gateway, product setup)
- Marketplace Management: ₹5,299/month (Amazon/Flipkart listing, optimization, growth support)

CONTACT:
Phone: +91 9950517638 | +91 7230847461
Instagram: @growth__xmedia
Response time: within 24 hours

RULES:
1. Keep all responses under 80 words
2. Always end with ONE soft CTA — alternate between: "Want a free audit?" / "DM us @growth__xmedia!" / "Call us at 9950517638"
3. Never invent services or prices not listed above
4. For complex queries: "For detailed info, our team will sort you out — call 9950517638!"
5. Be helpful first, salesy second`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('CHAT_ERROR: GROQ_API_KEY is missing.');
      return NextResponse.json(
        { reply: "I'm currently offline (Groq key missing). Please call +91 9950517638!" },
        { status: 200 }
      );
    }

    console.log(`CHAT_LOG: Sending request to Groq with ${messages.length} messages.`);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CHAT_ERROR: Groq API returned ${response.status}: ${errorText}`);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 
                  "I'm at a loss for words! Let's talk over the phone? +91 9950517638";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('CHAT_ERROR:', error.message);
    return NextResponse.json(
      { reply: "For detailed info, call us at +91 9950517638 — our team will sort you out!" },
      { status: 200 }
    );
  }
}
