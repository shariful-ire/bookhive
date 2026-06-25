"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function HeroButtons() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/all-books" className="btn btn-primary btn-lg shadow-lg shadow-primary/25 px-8">
        Browse Now
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
      {!session && (
        <Link href="/register" className="btn btn-outline btn-lg">
          Join Free
        </Link>
      )}
    </div>
  );
}

export function BottomCTA() {
  const { data: session } = useSession();

  if (session) return null;

  return (
    <section className="bg-section-alt border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Start Reading?
        </h2>
        <p className="text-base-content/50 mb-8 max-w-lg mx-auto">
          Join thousands of readers who borrow books daily. Create your free
          account and start exploring.
        </p>
        <Link href="/register" className="btn btn-primary btn-lg shadow-lg shadow-primary/25">
          Create Free Account
        </Link>
      </div>
    </section>
  );
}
