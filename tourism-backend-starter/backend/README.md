# Tourism App - Backend API

## Setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in:
   - `MONGO_URI` - free cluster from https://www.mongodb.com/cloud/atlas
   - `JWT_SECRET` - any long random string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` - credentials for your first admin account
4. Create your admin account (one-time): `npm run seed:admin`
5. Start the dev server: `npm run dev`
6. Confirm it's running: visit `http://localhost:5000/api/health`

## What's implemented so far

- User model with hashed passwords (bcrypt) and role field (`customer` | `admin`)
- Package, Destination, Booking, Review models with indexes
- JWT authentication (`authenticate` middleware) and role-based access control (`requireRole` middleware)
- Auth routes: register, login, get current user
- Package routes: public listing (with pagination/filtering/search) + admin-only create/update/soft-delete
- Centralized error handling and async error wrapping
- Admin seed script (the only way an admin account is ever created - no public signup path)

## Still to build (next phases)

- Destination routes (same CRUD pattern as packages)
- Booking routes (create, my-bookings, cancel, admin view-all)
- Review routes (with "must have completed a booking" rule, and denormalized rating updates on Package)
- Admin dashboard-stats route
- Swagger/OpenAPI docs
- Nodemailer booking confirmation emails

## Architecture notes

- Admin functionality is protected purely at the API layer (`authenticate` + `requireRole('admin')`),
  not hidden by frontend tricks - so it's actually secure, not just visually hidden.
- Soft-deletes (`isActive: false`) are used for packages so booking/review history stays valid
  even after a package is "removed" from customer view.
- `avgRating`/`reviewCount` on Package are denormalized from Review documents to keep the
  listing page fast (read-optimized at the cost of a bit of extra write logic).
