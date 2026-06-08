install next app: npx create-next-app@latest my-app
## Folder Structure: 
Root
book-borrow-app/
.env.local
secrets
.env.example
.gitignore
next.config.mjs
tailwind.config.js
package.json
README.md
App Router (Next.js)
app/
Next.js app router
layout.js
root layout + navbar + footer
page.js
Home page
globals.css
loading.js
global skeleton loader
not-found.js
---
auth/
BetterAuth routes
[...all]/
route.js
BetterAuth catch-all handler
login/
page.js
Login form page
register/
page.js
Register form page
books/
page.js
All Books + search + sidebar
[id]/
page.js
Private — Book detail page
profile/
page.js
Private — My Profile
update/
page.js
Private — Update name & avatar
API Routes
app/api/
books/
route.js
GET all books
[id]/
route.js
GET single book + PATCH quantity
borrow/
route.js
POST borrow action

---

Components
components/
ui/
shared primitives
Navbar.jsx
Footer.jsx
BookCard.jsx
CategorySidebar.jsx
Marquee.jsx
LoadingSpinner.jsx
home/
Home page sections
Banner.jsx
FeaturedBooks.jsx
NewsletterSection.jsx
TestimonialsSection.jsx
auth/
auth form components
LoginForm.jsx
RegisterForm.jsx
GoogleButton.jsx
Library & Data
lib/
auth.js
BetterAuth server config
auth-client.js
BetterAuth client hooks
mongodb.js
MongoDB connection
books.js
book fetch helpers
data/
books.json
12 seed books
models/
Book.js
Mongoose schema
BorrowRecord.js
Mongoose schema
public/
logo.svg