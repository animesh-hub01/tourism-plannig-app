import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

destinationSchema.index({ name: 'text', country: 'text' });

export default mongoose.model('Destination', destinationSchema);
