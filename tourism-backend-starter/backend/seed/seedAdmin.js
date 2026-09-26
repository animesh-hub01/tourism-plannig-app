// Run once with: npm run seed:admin
// This is the ONLY way an admin account is created - there is no public
// "become an admin" endpoint anywhere in the API, by design.
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists:', existing.email);
    process.exit(0);
  }

  const admin = await User.create({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD, // gets hashed automatically by the User model's pre-save hook
    role: 'admin',
  });

  console.log('Admin account created:', admin.email);
  process.exit(0);
};

seedAdmin();
