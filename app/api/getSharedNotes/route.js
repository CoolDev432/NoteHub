import { NextResponse } from "next/server";
import { Query } from "appwrite";
import { database } from "@/appwriteConf";

export async function GET(req) {
const res = await database.listDocuments(
    '68a86d6c003a2103da12',
    'sharedNotes'
  );

  return NextResponse.json(res)

}