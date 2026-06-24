"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const image = formData.get("image");

    if (!name) {
      toast.error("Name is required");
      setLoading(false);
      return;
    }

    await authClient.updateUser(
      { name, image: image || undefined },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          router.push("/my-profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Update failed");
        },
      }
    );

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <Link href="/my-profile" className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Profile
      </Link>

      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">
            Update Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="url"
                name="image"
                defaultValue={user.image || ""}
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
              />
              {user.image && (
                <div className="mt-3">
                  <p className="text-sm text-base-content/50 mb-2">
                    Current avatar:
                  </p>
                  <div className="avatar">
                    <div className="w-16 rounded-full overflow-hidden">
                      <Image
                        src={user.image}
                        alt="Preview"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Information"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
