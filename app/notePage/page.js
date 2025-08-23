import { Suspense } from "react";
import NotePageClient from "./NotePageClient";

export default function NotePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotePageClient />
    </Suspense>
  );
}
