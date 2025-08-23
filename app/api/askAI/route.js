import { NextResponse } from "next/server";

export async function POST(req) {
    const { text, question, chat } = await req.json();

    const requestBody = {
        messages: [
            {
                role: "user",
                content: `Answer this question: ${question} in simple and friendly manner with examples. Here is the previous chat history: ${chat}. This question is from this text: ${text}. DONT USE ### OR * IN YOUR ANSWER AND LEAVE A LINE AFTER EVERY TOPIC`,
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

    const result = await response.json();

    let summary = result.choices?.[0]?.message?.content

    const parts = summary.split('</think>');
    if (parts.length > 1) {
        summary = parts.slice(1).join('</think>').trim();
    }

    return NextResponse.json(summary)

}