import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { text } = await req.json();

        const requestBody = {
            messages: [
                {
                    role: "user",
                    content: `Summarize all of this in the shortest you can, But also be friendly and explain in simple terms. IMPORTANT: DO NOT USE ASTERISKS ANYWHERE WHILE GENERATING THE ANSWER: ${text}`,
                },
            ],
            model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
        };

        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            return NextResponse.json({ error: errText }, { status: response.status });
        }

        const result = await response.json();

        let summary = result.choices?.[0]?.message?.content || "No summary available.";

        const parts = summary.split('</think>');
        if (parts.length > 1) {
            summary = parts.slice(1).join('</think>').trim();
        }

        return NextResponse.json({ summary });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
