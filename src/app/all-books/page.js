"use client";

import { useState, useEffect, useMemo } from "react";
import BookCard from "@/components/BookCard";
import booksData from "@/data/books.json";

const categories = ["All", "Story", "Tech", "Science"];

export default function AllBooksPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search books by title or author..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar — Category filter */}
        <aside className="lg:w-56 shrink-0">
          <h3 className="font-semibold mb-3 text-base-content/80">
            Categories
          </h3>
          <ul className="menu bg-base-200 rounded-box border border-base-300 w-full">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={activeCategory === cat ? "active" : ""}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="badge badge-sm badge-neutral">
                    {getCategoryCount(cat)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Book grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-base-content/50">
              <p className="text-xl">No books found</p>
              <p className="text-sm mt-2">
                Try a different search or category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
