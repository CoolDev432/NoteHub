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

    const pdfPayload = {
      url: publicUrl,
      lang: "eng",
      inline: true,
      pages: "0-",
      async: false,
    }

    const pdfRes = await fetch("https://api.pdf.co/v1/pdf/convert/to/text", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.PDF_CO,
      },
      body: JSON.stringify(pdfPayload),
    })

    const pdfResult = await pdfRes.json()
    if (!pdfRes.ok || pdfResult.error) {
      return NextResponse.json(
        { error: pdfResult.message || "Failed to extract PDF text" },
        { status: 500 }
      )
    }

    const extractedText = pdfResult.body || ""

    const requestBody = {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this report card (PDF text provided below) and summarize performance with strengths, weaknesses, and practice topics in a very friendly and simple form but answer in-depth. 
              
Tell them some topics they can study to improve (e.g., logical reasoning if math is weak). 
DO NOT GET THE ANALYSIS WRONG!

After your analysis text, also generate a valid Mermaid mindmap diagram that organizes the analysis clearly.

The Mermaid code must always start with:
mindmap
  root((Report Card))

Then branch into:
  Strengths
  Areas to Improve
  Practice Topics

Rules:
- Write plain text analysis first.
- Then on a new line write "MERMAID:" followed by the raw Mermaid code.
- Do NOT wrap in backticks (\`\`\`).
- Do NOT add extra explanation after the Mermaid diagram.

Here is the PDF text:
${extractedText}`,
            },
          ],
        },
      ],
      model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
    }

    const aiResponse = await fetch("https://router.huggingface.co/v1/chat/completions", {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })

    const aiResult = await aiResponse.json()
    let analysis = aiResult.choices?.[0]?.message?.content || "No analysis available"

    const parts = analysis.split("</think>")
    if (parts.length > 1) {
      analysis = parts.slice(1).join("</think>").trim()
    }

    return NextResponse.json({
      fileId: uploaded.$id,
      url: publicUrl,
      text: extractedText,
      analysis,
    })
  } catch (err) {
    console.error("error:", err)
    return NextResponse.json({ error: "Failed to analyze report card" }, { status: 500 })
  }
}
