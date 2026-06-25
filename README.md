# 📚 BookHive - Online Book Borrowing Platform

<div align="center">





\

### A Modern Online Book Borrowing Platform

Browse, search, and borrow books seamlessly with secure authentication and a beautiful responsive interface.

### 🌐 Live Demo

**https://bookhive-kappa-three.vercel.app/**

</div>

---

## 📖 About The Project

BookHive is a modern online book borrowing platform built with **Next.js App Router**, **MongoDB Atlas**, and **BetterAuth**. Users can explore books, filter by categories, search by title or author, and securely manage their accounts.

The platform focuses on providing a clean, responsive, and user-friendly experience for book enthusiasts.

---

## ✨ Features

### 🔐 Authentication & Security

* Google OAuth Login
* Protected Routes using Middleware
* Persistent User Sessions
* Secure Authentication with BetterAuth

### 📚 Book Management

* Browse a collection of books
* Search books by title or author
* Filter books by category
* Detailed book information page
* Borrow books functionality

### 👤 User Features

* User Profile Page
* Update Profile Information
* Personalized Experience
* Session Management

### 🎨 UI & Experience

* Fully Responsive Design
* Modern Dark Theme Interface
* Beautiful DaisyUI Components
* Swiper.js Carousels
* Toast Notifications
* Mobile-Friendly Navigation

---

## 🛠️ Tech Stack

| Category       | Technologies              |
| -------------- | ------------------------- |
| Frontend       | Next.js 16, React 19      |
| Styling        | Tailwind CSS 4, DaisyUI 5 |
| Authentication | BetterAuth                |
| Database       | MongoDB Atlas             |
| Carousel       | Swiper.js                 |
| Notifications  | React Hot Toast           |
| Deployment     | Vercel                    |

---

## 📦 Dependencies

```json
{
  "next": "^16",
  "react": "^19",
  "react-dom": "^19",
  "tailwindcss": "^4",
  "daisyui": "^5",
  "better-auth": "^1",
  "mongodb": "^6",
  "swiper": "^11",
  "react-hot-toast": "^2"
}
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js (v18 or later)
* npm or yarn
* MongoDB Atlas Account
* Google Cloud Console Account (for OAuth)

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shariful-ire/bookhive.git
cd bookhive
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookhive

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

### 4️⃣ Generate BetterAuth Secret

Linux / Mac:

```bash
openssl rand -base64 32
```

Windows PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copy the generated secret and set it as:

```env
BETTER_AUTH_SECRET=generated_secret
```

---

### 5️⃣ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔑 Google Authentication Setup

### Step 1

Go to:

https://console.cloud.google.com/

### Step 2

Create a new project.

### Step 3

Enable:

* Google Identity Services API

### Step 4

Create OAuth Credentials.

### Step 5

Add Authorized Redirect URI:

Development:

```text
http://localhost:3000/api/auth/callback/google
```

Production:

```text
https://bookhive-kappa-three.vercel.app/api/auth/callback/google
```

### Step 6

Copy:

* GOOGLE_CLIENT_ID
* GOOGLE_CLIENT_SECRET

And place them inside:

```env
GOOGLE_CLIENT_ID=xxxx
GOOGLE_CLIENT_SECRET=xxxx
```

---

## 🗄️ MongoDB Setup

### Create Database

```text
BookHive
```

### Create Cluster

1. Sign in to MongoDB Atlas
2. Create a free cluster
3. Create a database user
4. Allow network access
5. Copy connection string

Example:

```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/bookhive
```

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/
│   │   ├── books/
│   │   └── books/[id]/
│   │
│   ├── all-books/
│   │   └── [id]/
│   │
│   ├── login/
│   ├── register/
│   ├── my-profile/
│   │   └── update/
│   │
│   └── page.js
│
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── BookCard.js
│   └── SwiperCarousel.js
│
├── lib/
│   ├── auth.js
│   ├── auth-client.js
│   └── mongodb.js
│
├── data/
│   └── books.json
│
└── middleware.js
```

---

## 📱 Pages

| Route                | Description       |
| -------------------- | ----------------- |
| `/`                  | Home Page         |
| `/all-books`         | Browse All Books  |
| `/all-books/[id]`    | Book Details      |
| `/login`             | User Login        |
| `/register`          | User Registration |
| `/my-profile`        | User Profile      |
| `/my-profile/update` | Update Profile    |

---

## 🎯 Future Improvements

* Book Return System
* Borrow History Tracking
* Admin Dashboard
* Book Reviews & Ratings
* Wishlist Feature
* Pagination
* Email Notifications
* Advanced Search & Filtering
* Real Database-Powered Book Management
* Recommendation System

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push to the branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

## 👨‍💻 Developer

### Md. Shariful Islam

🔗 GitHub: https://github.com/shariful-ire

🔗 LinkedIn: https://www.linkedin.com/in/shariful-ire/

🔗 Project Repository: https://github.com/shariful-ire/bookhive

🔗 Live Website: https://bookhive-kappa-three.vercel.app/

---

<div align="center">

### 📚 Happy Reading with BookHive 🚀

Made with ❤️ using Next.js, MongoDB & BetterAuth

</div>
