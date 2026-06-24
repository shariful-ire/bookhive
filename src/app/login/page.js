"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    await signIn.email(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Login failed");
        },
      }
    );

    setLoading(false);
  }

  async function handleGoogleLogin() {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]" />

      <div className="card w-full max-w-md bg-base-200/80 backdrop-blur-sm shadow-2xl shadow-black/20 border border-white/5 relative z-10">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold">Login to Your Library</h2>
            <p className="text-base-content/50 text-sm mt-2">
              Welcome back! Access your borrowed books.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full bg-base-300/50 focus:bg-base-300"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-300/50 focus:bg-base-300"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full shadow-lg shadow-primary/20 mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="divider text-base-content/30 text-xs my-4">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full gap-2 border-base-content/10 hover:bg-base-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-6 text-base-content/50">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
