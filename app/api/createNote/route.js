import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { database, storage } from "@/appwriteConf";

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const file = formData.get("file"); 
  const email = formData.get("email"); 

  console.log("Title:", title);
  console.log("File:", file);

  const uploaded = await storage.createFile("notes", ID.unique(), file);
  const fileUrl = storage.getFileView('notes', uploaded.$id).href; 
    console.log(`Link generated: https://syd.cloud.appwrite.io/v1/storage/buckets/notes/files/${uploaded.$id}/view?project=notehub`)

    await database.createDocument(
        '68a86d6c003a2103da12',
        'notes',
        ID.unique(),
        {
            noteLink: `https://syd.cloud.appwrite.io/v1/storage/buckets/notes/files/${uploaded.$id}/view?project=notehub`,
            title: title,
            email: email
        }
    )

  return NextResponse.json({ message: "File received!" });
}
