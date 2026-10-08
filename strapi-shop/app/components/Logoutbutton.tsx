"use client";

import { signOut } from "next-auth/react";

export default function Logoutbutton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-xs font-semibold text-slate-500 transition-all hover:border-red-400/20 hover:bg-red-400/[0.04] hover:text-red-300"
    >
      Logout
    </button>
  );
}