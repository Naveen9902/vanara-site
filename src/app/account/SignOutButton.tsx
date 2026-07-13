"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="va-btn" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </button>
  );
}
