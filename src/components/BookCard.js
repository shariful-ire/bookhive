import Link from "next/link";
import Image from "next/image";

export default function BookCard({ book, badge }) {
  return (
    <Link
      href={`/all-books/${book.id}`}
      className="group card bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
    >
      {/* Image */}
      <figure className="relative h-64 overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {badge && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            {badge}
          </span>
        )}

        {/* Bottom overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              {book.category}
            </span>
            <span className="text-xs text-white/60">
              {book.available_quantity} left
            </span>
          </div>
        </div>
      </figure>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {book.title}
        </h3>
        <p className="text-sm text-base-content/40 mt-1 mb-4">{book.author}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${star <= 4 ? "text-yellow-500" : "text-base-content/20"}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
