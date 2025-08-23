import { NextResponse } from "next/server";
import { Query } from "appwrite";
import { database } from "@/appwriteConf";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const res =await database.listDocuments(
    '68a86d6c003a2103da12',
    'notes',
    [Query.equal('email', email)]
  )

  return NextResponse.json(res)
}