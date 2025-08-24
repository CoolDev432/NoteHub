import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { database } from "@/appwriteConf";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const link = searchParams.get("link");
    const email = searchParams.get("email");


    const res = await database.createDocument(
        '68a86d6c003a2103da12',
        'notes',
        ID.unique(),
        {
            noteLink: link,
            title: title,
            email: email
        }
    )

    return NextResponse.json({success: true})
}