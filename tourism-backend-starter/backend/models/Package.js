import mongoose from 'mongoose';

const itineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    details: { type: String },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    duration: {
      nights: { type: Number, required: true },
      days: { type: Number, required: true },
    },
    maxTravelers: { type: Number, required: true, default: 10 },
    images: [{ type: String }],
    itinerary: [itineraryDaySchema],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    availableDates: [{ type: Date }],
    // Denormalized fields, kept in sync from the Review model whenever a
    // review is added/removed. Trades a bit of write complexity for much
    // faster reads on the listing page (no aggregation needed per request).
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }, // soft-delete flag
  },
  { timestamps: true }
);

packageSchema.index({ title: 'text' });
packageSchema.index({ price: 1 });
packageSchema.index({ avgRating: -1 });
packageSchema.index({ destination: 1 });

export default mongoose.model('Package', packageSchema);
