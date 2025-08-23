import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { storage } from "@/appwriteConf";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uploaded = await storage.createFile("reportCard", ID.unique(), file);

    const publicUrl = `https://syd.cloud.appwrite.io/v1/storage/buckets/reportCard/files/${uploaded.$id}/view?project=notehub`;

    const requestBody = {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this report card image and summarize performance with strengths and weaknesses. Give the user all the topics they should practice and give them all these answers in a friendly and simple form. No need to mention grade and all that, just focus on the analysis.Focus on the marks a lot and fo not get anything wrong.DO NOT USE * OR # OR ### OR *** IN YOUR ANSWER!",
            },
            {
              type: "image_url",
              image_url: {
                url: publicUrl,
              },
            },
          ],
        },
      ],
      model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
    };

    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",   
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    let analysis = result.choices?.[0]?.message?.content || "No analysis available";

    const parts = analysis.split("</think>");
    if (parts.length > 1) {
      analysis = parts.slice(1).join("</think>").trim();
    }

    console.log(analysis)
    return NextResponse.json({
      fileId: uploaded.$id,
      url: publicUrl,
      analysis,
    });
  } catch (err) {
    console.error("Error analyzing report card:", err);
    return NextResponse.json({ error: "Failed to analyze report card" }, { status: 500 });
  }
}
