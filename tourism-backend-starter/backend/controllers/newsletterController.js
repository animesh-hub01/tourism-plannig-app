import Newsletter from '../models/Newsletter.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existing = await Newsletter.findOne({ email });
  if (existing) {
    return res.json({ success: true, message: 'You are already subscribed' });
  }

  await Newsletter.create({ email });
  res.status(201).json({ success: true, message: 'Subscribed successfully' });
});