import { NextResponse } from "next/server"
import { ID } from "appwrite"
import { storage } from "@/appwriteConf"

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const uploaded = await storage.createFile("reportCard", ID.unique(), file)

    const publicUrl = `https://syd.cloud.appwrite.io/v1/storage/buckets/reportCard/files/${uploaded.$id}/view?project=notehub`

    const requestBody = {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this report card image and summarize performance with strengths, weaknesses, and practice topics in a very friendly and simple form but answer in-depth. DO NOT GET THE ANALYSIS WRONG, WHATEVER YOU DO! 
              
After your analysis text, also generate a valid Mermaid mindmap diagram that organizes the analysis clearly.

The Mermaid code must always start with:
mindmap
  root((Report Card))

Then branch into:
  Strengths
  Areas to Improve
  Practice Topics

Example format:

MERMAID:
mindmap
  root((Report Card))
    Strengths
      Math (A)
      Science (A)
    Areas to Improve
      Reading (C)
      Writing (C)
    Practice Topics
      Reading comprehension
      Writing full-sentence answers

 Rules:
- Write plain text analysis first.
- Then on a new line write "MERMAID:" followed by the raw Mermaid code.
- Do NOT wrap in backticks (\`\`\`).
- Do NOT add extra explanation after the Mermaid diagram.`,
            },
            {
              type: "image_url",
              image_url: { url: publicUrl },
            },
          ],
        },
      ],
      model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
    }

    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })

    const result = await response.json()
    let analysis = result.choices?.[0]?.message?.content || "No analysis available"

    const parts = analysis.split("</think>")
    if (parts.length > 1) {
      analysis = parts.slice(1).join("</think>").trim()
    }

    return NextResponse.json({
      fileId: uploaded.$id,
      url: publicUrl,
      analysis,
    })
  } catch (err) {
    console.error("Error analyzing report card:", err)
    return NextResponse.json({ error: "Failed to analyze report card" }, { status: 500 })
  }
}
