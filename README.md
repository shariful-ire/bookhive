# 📚 Book Borrowing Platform

A modern Book Borrowing Platform built with **Next.js**, **HeroUI**, **DaisyUI**, **Tailwind CSS**, **Better Auth**, and **MongoDB**.

---

## 🚀 Tech Stack

* Next.js
* React
* Tailwind CSS
* DaisyUI
* HeroUI
* Better Auth
* MongoDB

---

# 📦 Installation Guide

## 1. Clone the Repository

```bash
git clone <repository-url>
cd book-borrowing-platform
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# ⚡ Create a Next.js Project

```bash
npx create-next-app@latest
```

or

```bash
npx create-next-app@latest . --js
```

---

# 🎨 Tailwind CSS Setup

Install Tailwind CSS:

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

Configure Tailwind and import it into your project.

---

# 🌼 DaisyUI Setup

Install DaisyUI:

```bash
npm install daisyui
```

Add DaisyUI plugin to Tailwind configuration.

---

# 🎯 HeroUI Setup

Install HeroUI:

```bash
npm install @heroui/react framer-motion
```

Configure HeroUI provider in your application.

---

# 🔐 Better Auth Setup

Install Better Auth:

```bash
npm install better-auth
```

Create:

```text
lib/auth.js
lib/auth-client.js
```

Configure:

* Email/Password Authentication
* Session Management
* OAuth Providers (Google, GitHub, etc.)

---

# 🍃 MongoDB Installation & Setup

## Option 1: MongoDB Atlas (Recommended)

1. Create a MongoDB Atlas account.
2. Create a Cluster.
3. Create a Database User.
4. Allow Network Access.
5. Copy Connection String.

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book_platform
```

---

---

# 🔗 MongoDB Connection

Create:

```text
lib/mongodb.js
```

Example:

```javascript
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default client;
```

---

# 🔑 Environment Variables

Create:

```text
.env.local
```

Example:

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

# ▶️ Start Application

```bash
npm run dev
```
Production Build:

```bash
npm run build
npm start
```



# 👨‍💻 Developer

Book Borrowing Platform Project

Built with ❤️ using Next.js, MongoDB, Better Auth, HeroUI, DaisyUI, and Tailwind CSS.
