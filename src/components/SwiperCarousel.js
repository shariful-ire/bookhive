"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BookCard from "./BookCard";

export default function SwiperCarousel({ books, badge }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      className="pb-10"
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <BookCard book={book} badge={badge} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
