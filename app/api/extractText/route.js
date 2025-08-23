import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    const payload = {
      url,  
      lang: "eng",
      inline: true,
      pages: "0-",
      async: false
    };

    const pdfCoRes = await fetch("https://api.pdf.co/v1/pdf/convert/to/text", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.PDF_CO, 
      },
      body: JSON.stringify(payload),
    });

    const result = await pdfCoRes.json();
    console.log(result)
    if (!pdfCoRes.ok || result.error) {
      return NextResponse.json(
        { error: result.message || "Failed to process PDF" },
        { status: 500 }
      );
    }

    return NextResponse.json({ text: result.body });
  } catch (err) {
    console.error("PDF Extract Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
