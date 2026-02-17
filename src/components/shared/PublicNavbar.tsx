"use client";

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function PublicNavbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="container mx-auto px-4 py-2 border-b-2">
      <div className="flex items-center justify-between">
        {/* logo */}
        <Link href="/" className="text-xl font-bold text-gray-600">
          SeeMyStock
        </Link>

        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-gray-600 hover:text-gray-900">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-[#6c47ff] text-white rounded-full px-4 py-2">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <Link href="/dashboard">
                <button className="bg-[#6c47ff] text-white rounded-full px-4 py-2">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
