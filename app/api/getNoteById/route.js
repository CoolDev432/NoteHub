import { NextResponse } from "next/server";
import { Query } from "appwrite";
import { database } from "@/appwriteConf";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const res =await database.listDocuments(
    '68a86d6c003a2103da12',
    'notes',
    [Query.equal('$id', id)]
  )

  return NextResponse.json(res)
}