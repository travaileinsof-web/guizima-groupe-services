import { NextRequest, NextResponse } from "next/server";

// POST /api/chat — public, conversational assistant for IREX Mining
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const lang = body?.lang === "en" ? "en" : "fr";

    const lastUser = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    if (!lastUser || !String(lastUser.content || "").trim()) {
      return NextResponse.json(
        { error: "Empty message" },
        { status: 400 }
      );
    }

    const systemPrompt =
      lang === "en"
        ? "You are the virtual assistant of Guizima Group Services, a multisector company based in Guinea. Be concise, professional and helpful. Answer in English. Explain that the group works in general trade, hydrocarbons, services, transport, real estate, construction, agriculture and livestock. For pricing, encourage visitors to use the contact form or call +224 624 56 72 72."
        : "Tu es l'assistant virtuel de GUIZIMA GROUP SERVICES, groupe multisectoriel basé en Guinée. Sois concis, professionnel et utile. Réponds en français. Présente ses huit domaines: commerce général, hydrocarbures, prestations de services, transport et logistique, immobilier, construction et travaux publics, agriculture et élevage. Pour un prix, invite à utiliser le formulaire ou à appeler le +224 624 56 72 72.";

    let reply: string | null = null;

    try {
      // Lazy import so the route still loads even if the SDK is unavailable in prod
      const ZAI = (await import("z-ai-web-dev-sdk")).default;
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-8).map((m: { role: string; content: string }) => ({
            role: m.role === "bot" ? "assistant" : m.role,
            content: m.content,
          })),
        ],
        thinking: { type: "disabled" },
      });
      reply = completion?.choices?.[0]?.message?.content ?? null;
    } catch (aiErr) {
      console.error("AI SDK unavailable, using fallback:", aiErr);
    }

    if (!reply) {
      // Graceful fallback when no AI provider is configured
      reply =
        lang === "en"
          ? "Thanks for reaching out! For a precise answer, please leave us a message via the Contact section or call +224 624 56 72 72. Our team will get back to you shortly."
          : "Merci de votre message ! Pour une réponse précise, laissez-nous un message via la section Contact ou appelez le +224 624 56 72 72. Notre équipe vous répondra rapidement.";
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
