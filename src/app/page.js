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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-base-300 via-base-100 to-base-300" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.08),transparent_50%)]" />

        <div className="text-center px-4 z-10 max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-widest uppercase text-primary/80 mb-4">
            Welcome to BookHive
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
            Find Your Next{" "}
            <span className="bg-linear-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Read
            </span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore thousands of books. Borrow instantly. Your personal library
            awaits — no late fees, no limits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/all-books" className="btn btn-primary btn-lg shadow-lg shadow-primary/25 px-8">
              Browse Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/register" className="btn btn-outline btn-lg">
              Join Free
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-16 mt-16">
            <div>
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-xs text-base-content/40 mt-1">Books Available</p>
            </div>
            <div className="w-px bg-base-content/10" />
            <div>
              <p className="text-3xl font-bold text-primary">5K+</p>
              <p className="text-xs text-base-content/40 mt-1">Active Readers</p>
            </div>
            <div className="w-px bg-base-content/10" />
            <div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-xs text-base-content/40 mt-1">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-emerald-500/5 border-y border-emerald-500/10 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16 text-sm text-emerald-400/80 font-medium">
          <span>New Arrivals: The Great Gatsby | Clean Code | Cosmos | Sapiens</span>
          <span>Special Discount on Annual Memberships — Join Today!</span>
          <span>Over 10,000+ books available for instant borrowing</span>
          <span>New Arrivals: The Great Gatsby | Clean Code | Cosmos | Sapiens</span>
          <span>Special Discount on Annual Memberships — Join Today!</span>
          <span>Over 10,000+ books available for instant borrowing</span>
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-base-content/10" />
          <p className="text-xs font-medium tracking-widest uppercase text-primary/70">Curated for you</p>
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-base-content/10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">Featured Books</h2>
        <p className="text-base-content/50 text-center mb-12 max-w-lg mx-auto">
          Hand-picked selections from our top-rated collection
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Divider line */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-linear-to-r from-transparent via-base-content/10 to-transparent" />
      </div>

      {/* Trending / Most Borrowed */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-red-500/10" />
            <p className="text-xs font-medium tracking-widest uppercase text-red-400/70">Hot right now</p>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-red-500/10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">Trending Books</h2>
          <p className="text-base-content/50 text-center mb-12 max-w-lg mx-auto">
            Most borrowed this month — grab yours before they&apos;re gone
          </p>
          <SwiperCarousel books={trendingBooks} badge="Trending" />
        </div>
      </section>

      {/* Divider line */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-px bg-linear-to-r from-transparent via-base-content/10 to-transparent" />
      </div>

      {/* Recommendations */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-cyan-500/10" />
          <p className="text-xs font-medium tracking-widest uppercase text-cyan-400/70">Recommended</p>
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-cyan-500/10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">You Might Also Like</h2>
        <p className="text-base-content/50 text-center mb-12 max-w-lg mx-auto">
          Explore fascinating reads from the Science collection
        </p>
        <SwiperCarousel books={scienceBooks} />
      </section>

      {/* CTA Section */}
      <section className="bg-base-200/50 border-y border-base-300">
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
    </div>
  );
}
