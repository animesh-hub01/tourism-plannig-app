# Travelpro — Full-Stack Tourism Planning Platform

A full-stack travel booking platform built with the MERN stack, featuring separate customer-facing and admin applications sharing one secured REST API.

Built as an individual portfolio project to practice production-style architecture: authentication, role-based access control, database design, and a real customer booking/review workflow.

## Live Demo
- Customer app: _add link after deployment_
- Admin app: _add link after deployment_ (admin credentials not publicly shared)
- API: _add link after deployment_

## Screenshots
_Add a few screenshots here once your app looks polished — homepage, package detail, admin dashboard._

## Features

**Customer-facing**
- Browse and search travel packages (filter by price, sort by rating, pagination)
- View package details, itinerary, and reviews
- Book a package with real-time price calculation
- View and cancel own bookings
- Leave a review — restricted to customers with a completed booking for that package
- Wishlist packages
- Newsletter signup

**Admin (separate, access-restricted application)**
- Dashboard with live stats: total customers, total bookings, revenue, top-rated packages
- Full CRUD on Packages and Destinations
- View and update the status of all bookings
- View all registered customers
- No admin functionality is exposed anywhere in the customer-facing app — admin access is a fully separate application, protected end-to-end by backend role checks

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (both apps) | React, Vite, Tailwind CSS |
| Data fetching / caching | TanStack React Query |
| Routing | React Router |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT, bcrypt |
| Validation | express-validator |

## Architecture
Customer App (React, :5173) Admin App (React, :5174)
\ /
\ /
Express REST API (:5000)
|
MongoDB Atlas


Two independent React frontends share a single Express/MongoDB backend. This separation mirrors real-world systems where an internal admin tool and a public-facing product are built and deployed independently, while staying backed by one consistent source of truth.

### Key architectural decisions
- **JWT-based stateless auth** — the backend never stores sessions; each request carries its own signed token.
- **Role-based access control (RBAC)**, enforced via Express middleware (`authenticate` → `requireRole('admin')`) on every admin route — not just hidden in the UI. A customer's JWT is rejected by the backend itself if it tries to reach an admin endpoint.
- **No public admin signup** — the only admin account is created via a one-time seed script, never through a public API route.
- **Soft deletes** for Packages (`isActive: false`) to preserve booking/review history integrity instead of breaking references.
- **Referential integrity checks in application code** — e.g. a Destination cannot be deleted while Packages still reference it, since MongoDB itself has no foreign-key constraints.
- **Denormalized rating fields** (`avgRating`, `reviewCount` on Package) recalculated on every review change, trading a small write-time cost for fast reads on listing pages.
- **Server-side price calculation** — booking price is computed from the package price and traveler count on the backend, never trusted from client input.

## Database Schema (MongoDB / Mongoose)

- **User** — `role: 'customer' | 'admin'`, hashed password, wishlist references
- **Destination** — name, country, description, image
- **Package** — references a Destination, embeds itinerary, denormalized rating fields
- **Booking** — references User and Package, tracks status and payment status
- **Review** — references User and Package, unique index prevents duplicate reviews per user/package
- **Newsletter** — simple email capture

## API Overview

| Resource | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Packages | `GET /api/packages` (search/filter/paginate), `GET /:id`, admin `POST` / `PUT` / `DELETE` |
| Destinations | `GET /api/destinations`, `GET /:id`, admin `POST` / `PUT` / `DELETE` |
| Bookings | `POST /api/bookings`, `GET /my`, `GET /:id`, `PATCH /:id/cancel` |
| Reviews | `GET /api/packages/:id/reviews`, `POST /api/packages/:id/reviews`, `DELETE /api/reviews/:id` |
| Wishlist | `GET`, `POST /:packageId`, `DELETE /:packageId` |
| Admin | `GET /api/admin/dashboard-stats`, `GET /users`, `GET /bookings`, `PATCH /bookings/:id/status` |

## Project Structure
tourism-project/
├── backend/ # Express API + MongoDB models
├── client/ # Customer-facing React app (port 5173)
└── admin/ # Admin dashboard React app (port 5174)


## Getting Started

### Prerequisites
- Node.js (v18+)
- A free MongoDB Atlas account/cluster

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run seed:admin     # creates the one and only admin account
npm run dev            # runs on http://localhost:5000
```

### 2. Customer app
```bash
cd client
npm install
cp .env.example .env
npm run dev             # runs on http://localhost:5173
```

### 3. Admin app
```bash
cd admin
npm install
cp .env.example .env
npm run dev             # runs on http://localhost:5174
```

All three run simultaneously for full functionality.

## What I'd Improve Next
- Payment integration (Stripe test mode)
- Email confirmations for bookings (Nodemailer)
- API documentation (Swagger/OpenAPI)
- Automated tests (Jest + Supertest for the API)
- Admin endpoint to view/reactivate soft-deleted packages

## Author
Built by **Akhouri Animesh** as an individual project.
