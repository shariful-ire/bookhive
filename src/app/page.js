import Link from "next/link";
import books from "@/data/books.json";
import BookCard from "@/components/BookCard";
import SwiperCarousel from "@/components/SwiperCarousel";

export default function Home() {
  const featuredBooks = books.slice(0, 4);
  const trendingBooks = books.filter((b) => b.available_quantity <= 4);
  const scienceBooks = books.filter((b) => b.category === "Science");

  return (
    <div>
      {/* Banner */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-linear-to-br from-base-300 via-base-100 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_60%)]"></div>
        <div className="text-center px-4 z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Find Your Next{" "}
            <span className="text-primary">Read</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/60 mb-8 max-w-xl mx-auto">
            Explore thousands of books. Borrow instantly. Your personal library
            awaits.
          </p>
          <Link href="/all-books" className="btn btn-primary btn-lg">
            Browse Now
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-emerald-500/5 border-y border-emerald-500/15 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm text-emerald-400 font-medium">
          <span>New Arrivals: The Great Gatsby | Clean Code | Cosmos | Sapiens</span>
          <span>Special Discount on Annual Memberships — Join Today!</span>
          <span>Over 10,000+ books available for instant borrowing</span>
          <span>New Arrivals: The Great Gatsby | Clean Code | Cosmos | Sapiens</span>
          <span>Special Discount on Annual Memberships — Join Today!</span>
          <span>Over 10,000+ books available for instant borrowing</span>
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2">Featured Books</h2>
        <p className="text-base-content/60 mb-8">
          Hand-picked selections for you
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Trending / Most Borrowed */}
      <section className="bg-base-200/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Trending Books</h2>
          <p className="text-base-content/60 mb-8">
            Most borrowed this month
          </p>
          <SwiperCarousel books={trendingBooks} badge="Trending" />
        </div>
      </section>

      {/* Recommendations */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-2">You Might Also Like</h2>
        <p className="text-base-content/60 mb-8">
          Recommended reads from Science
        </p>
        <SwiperCarousel books={scienceBooks} />
      </section>
    </div>
  );
}
