"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    const password = formData.get("password");

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    await signUp.email(
      { name, email, password, image: image || undefined },
      {
        onSuccess: () => {
          toast.success("Account created! Please login.");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed");
        },
      }
    );

    setLoading(false);
  }

  async function handleGoogleSignUp() {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08),transparent_50%)]" />

      <div className="card w-full max-w-md bg-base-200/80 backdrop-blur-sm shadow-2xl shadow-black/20 border border-white/5 relative z-10">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold">Join Our Library</h2>
            <p className="text-base-content/50 text-sm mt-2">
              Create an account to start borrowing books.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                className="input input-bordered w-full bg-base-300/50 focus:bg-base-300"
                required
              />
            </div>

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
                <span className="label-text text-sm font-medium">Photo URL <span className="text-base-content/30">(optional)</span></span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-base-300/50 focus:bg-base-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                className="input input-bordered w-full bg-base-300/50 focus:bg-base-300"
                minLength={8}
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
                "Create Account"
              )}
            </button>
          </form>

          <div className="divider text-base-content/30 text-xs my-4">OR</div>

          <button
            onClick={handleGoogleSignUp}
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
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
