import { NextResponse } from "next/server";
import { database } from "@/appwriteConf";
import { ID } from "appwrite";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    const link = searchParams.get("link");

    const res = await database.createDocument(
        '68a86d6c003a2103da12',
        'sharedNotes',
        ID.unique(),
        {
            noteLink: link,
            title: title
        }
    )

    return NextResponse.json({success: true})
}