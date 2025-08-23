import React from "react";

const Footer = () => (
  <footer
    className="w-full mt-12 py-6 bg-black text-white text-center shadow-inner"
    style={{ fontFamily: "var(--font-serif)" }}
  >
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-2">
      <span className="text-sm">
        &copy; {new Date().getFullYear()} NoteHub. All rights reserved.
      </span>
      <span className="text-xs opacity-80">
        Built for Tech Team Auditions, GURUKUL THE SCHOOL
      </span>
    </div>
  </footer>
);

export default Footer;