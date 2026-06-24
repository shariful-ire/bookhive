"use client";

import { useState, useMemo } from "react";
import BookCard from "@/components/BookCard";
import booksData from "@/data/books.json";

const categories = ["All", "Story", "Tech", "Science"];

export default function AllBooksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let result = [...booksData];

    if (activeCategory !== "All") {
      result = result.filter(
        (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query)
      );
    }

    return result;
  }, [search, activeCategory]);

  function getCategoryCount(cat) {
    if (cat === "All") return booksData.length;
    return booksData.filter(
      (b) => b.category.toLowerCase() === cat.toLowerCase()
    ).length;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">All Books</h1>
        <p className="text-base-content/50">
          Browse our full collection of {booksData.length} books
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or author..."
            className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <h3 className="text-sm font-semibold text-base-content/40 uppercase tracking-wider mb-3">
            Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary/15 text-primary"
                      : "text-base-content/60 hover:bg-base-300/50 hover:text-base-content"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === cat
                      ? "bg-primary/20 text-primary"
                      : "bg-base-300 text-base-content/40"
                  }`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Book grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-base-content/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-xl font-semibold">No books found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-base-content/40 mb-6">
                Showing {filtered.length} {filtered.length === 1 ? "book" : "books"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
