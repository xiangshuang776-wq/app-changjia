import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com", 
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString('base64');
    const res = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: [{ type: "text", text: "Identify product and factory price in USD. Return JSON." }, { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64}` } }] }],
      response_format: { type: "json_object" },
    });
    const ai = JSON.parse(res.choices[0].message.content || "{}");
    return NextResponse.json({ factory_price: ai.factory_price_usd || 2.15 });
  } catch (e) { return NextResponse.json({ error: "API Error" }, { status: 500 }); }
}
