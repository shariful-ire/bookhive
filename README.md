# BookHive - Online Book Borrowing Platform

A modern online book borrowing platform built with Next.js, Tailwind CSS, DaisyUI, and BetterAuth. Browse, search, and borrow books from a curated collection.

## Live URL

[https://bookhive.vercel.app](https://bookhive.vercel.app)

## Key Features

- Email/Password and Google OAuth authentication via BetterAuth
- Browse 12+ books with search by title/author and category filter (Story, Tech, Science)
- Book detail pages with borrow functionality (protected routes)
- User profile with update capability
- Fully responsive dark theme UI with DaisyUI
- Swiper.js carousels for trending and recommended books
- Toast notifications for all user actions
- Middleware-based route protection

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **Authentication:** BetterAuth (Email/Password + Google OAuth)
- **Database:** MongoDB Atlas
- **Carousels:** Swiper.js
- **Notifications:** React Hot Toast

## NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `react` / `react-dom` | UI library |
| `tailwindcss` | Utility-first CSS framework |
| `daisyui` | Tailwind CSS component library |
| `better-auth` | Authentication framework |
| `mongodb` | MongoDB Node.js driver |
| `swiper` | Touch-friendly carousels |
| `react-hot-toast` | Toast notifications |

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd bookhive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/bookhive
   BETTER_AUTH_SECRET=<generate-with-openssl-rand-base64-32>
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth API route
│   ├── api/books/           # Books API (GET with search/filter)
│   ├── api/books/[id]/      # Single book API
│   ├── all-books/           # All books page with search and filter
│   ├── all-books/[id]/      # Book details (protected)
│   ├── login/               # Login page
│   ├── register/            # Register page
│   ├── my-profile/          # User profile (protected)
│   └── my-profile/update/   # Update profile (protected)
├── components/
│   ├── Header.js            # Responsive navbar with auth state
│   ├── Footer.js            # Footer with social links
│   ├── BookCard.js          # Reusable book card component
│   └── SwiperCarousel.js    # Swiper carousel wrapper
├── lib/
│   ├── auth.js              # BetterAuth server config
│   ├── auth-client.js       # BetterAuth client hooks
│   └── mongodb.js           # MongoDB connection singleton
├── data/
│   └── books.json           # 12 book entries
└── middleware.js             # Route protection middleware
```
