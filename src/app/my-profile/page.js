"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBorrowedBooks } from "@/lib/borrow";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    setBorrowedBooks(getBorrowedBooks());
  }, []);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const user = session.user;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="card bg-base-200 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          {/* Avatar */}
          <div className="avatar mb-4">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              ) : (
                <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-4xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-base-content/60">{user.email}</p>

          <div className="divider"></div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-base-300/50 rounded-lg p-4">
              <p className="text-sm text-base-content/50">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div className="bg-base-300/50 rounded-lg p-4">
              <p className="text-sm text-base-content/50">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="bg-base-300/50 rounded-lg p-4">
              <p className="text-sm text-base-content/50">Member Since</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="bg-base-300/50 rounded-lg p-4">
              <p className="text-sm text-base-content/50">Books Borrowed</p>
              <p className="font-medium text-primary text-lg">
                {borrowedBooks.length}
              </p>
            </div>
          </div>

          {/* Recently Borrowed Books */}
          {borrowedBooks.length > 0 && (
            <>
              <div className="divider"></div>
              <div className="w-full text-left">
                <h3 className="font-semibold mb-4">Recently Borrowed</h3>
                <div className="space-y-3">
                  {borrowedBooks.map((book) => (
                    <Link
                      key={book.id}
                      href={`/all-books/${book.id}`}
                      className="flex items-center gap-4 bg-base-300/50 rounded-lg p-3 hover:bg-base-300 transition-colors"
                    >
                      <div className="relative w-10 h-14 rounded overflow-hidden shrink-0">
                        <Image
                          src={book.image_url}
                          alt={book.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {book.title}
                        </p>
                        <p className="text-xs text-base-content/50">
                          {book.author}
                        </p>
                      </div>
                      <span className="text-xs text-base-content/40 shrink-0">
                        {new Date(book.borrowedAt).toLocaleDateString()}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="card-actions mt-6">
            <Link href="/my-profile/update" className="btn btn-primary">
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
