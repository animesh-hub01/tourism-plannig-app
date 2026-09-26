import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    travelDate: { type: Date, required: true },
    travelers: {
      adults: { type: Number, required: true, min: 1 },
      children: { type: Number, default: 0 },
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1 });
bookingSchema.index({ package: 1 });

export default mongoose.model('Booking', bookingSchema);
