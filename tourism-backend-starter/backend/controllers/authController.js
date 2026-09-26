import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @route   POST /api/auth/register
// @access  Public
// NOTE: role is intentionally NOT read from req.body - it is always
// forced to 'customer' here. Admins are created only via the seed script.
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('An account with this email already exists');
  }

  const user = await User.create({ name, email, password, phone, role: 'customer' });
  const token = generateToken(user._id);

  res.status(201).json({ success: true, data: { token, user } });
});

// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);
  res.json({ success: true, data: { token, user } });
});

// @route   GET /api/auth/me
// @access  Private (any logged-in user)
export const getMe = asyncHandler(async (req, res) => {
  // req.user was attached by the `authenticate` middleware
  res.json({ success: true, data: { user: req.user } });
});
