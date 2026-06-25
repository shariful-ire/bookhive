"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBorrowedBooks, returnBook } from "@/lib/borrow";
import Avatar from "@/components/Avatar";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session) {
      setBorrowedBooks(getBorrowedBooks());
    }
  }, [session]);

  const handleReturn = useCallback(async (bookId, bookTitle) => {
    setReturningId(bookId);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const updated = returnBook(bookId);
    setBorrowedBooks(updated);
    setReturningId(null);
    toast.success(`"${bookTitle}" returned successfully!`);
  }, []);

  if (isPending || !session) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
        My Profile
      </h1>

      <div className="card bg-base-200/80 shadow-xl border border-white/5 backdrop-blur-sm">
        <div className="card-body items-center text-center">
          <div className="mb-4">
            <Avatar src={user.image} name={user.name} size={112} />
          </div>

          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-base-content/60">{user.email}</p>

          <div className="divider before:bg-primary/10 after:bg-primary/10"></div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="bg-base-300/40 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-base-content/50">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div className="bg-base-300/40 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-base-content/50">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="bg-base-300/40 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-base-content/50">Member Since</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-base-content/50">Books Borrowed</p>
              <p className="font-bold text-primary text-2xl">
                {borrowedBooks.length}
              </p>
            </div>
          </div>

          {borrowedBooks.length > 0 && (
            <>
              <div className="divider before:bg-primary/10 after:bg-primary/10"></div>
              <div className="w-full text-left">
                <h3 className="font-semibold mb-4 text-lg">Borrowed Books</h3>
                <div className="space-y-3">
                  {borrowedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 bg-base-300/40 border border-white/5 rounded-xl p-4 hover:bg-base-300/60 transition-all duration-300"
                    >
                      <Link
                        href={`/all-books/${book.id}`}
                        className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-base-300 shadow-md"
                      >
                        <img
                          src={book.image_url}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/all-books/${book.id}`}
                          className="font-medium text-sm truncate block hover:text-primary transition-colors"
                        >
                          {book.title}
                        </Link>
                        <p className="text-xs text-base-content/50 mt-0.5">
                          {book.author}
                        </p>
                        <p className="text-xs text-base-content/30 mt-1">
                          Borrowed{" "}
                          {new Date(book.borrowedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => handleReturn(book.id, book.title)}
                        disabled={returningId === book.id}
                        className={`btn btn-sm rounded-full gap-1.5 shrink-0 ${
                          returningId === book.id
                            ? "btn-disabled"
                            : "btn-warning btn-outline border-warning/40 hover:border-warning"
                        }`}
                      >
                        {returningId === book.id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Returning...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4"
                              />
                            </svg>
                            Return
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {borrowedBooks.length === 0 && (
            <>
              <div className="divider before:bg-primary/10 after:bg-primary/10"></div>
              <div className="w-full text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4 text-base-content/15"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-base-content/40 font-medium">
                  No books borrowed yet
                </p>
                <p className="text-sm text-base-content/30 mt-1">
                  Visit the library to borrow your first book!
                </p>
                <Link
                  href="/all-books"
                  className="btn btn-primary btn-sm mt-4 rounded-full"
                >
                  Browse Books
                </Link>
              </div>
            </>
          )}

          <div className="card-actions mt-6">
            <Link
              href="/my-profile/update"
              className="btn btn-primary rounded-full px-6"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
