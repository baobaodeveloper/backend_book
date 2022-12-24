import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    priceNumber: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [
      { number: Number, unavailableDates: [{ type: Date }] },
    ],
  },
  { timestamps: true }
);

export const Room = mongoose.model('Room', roomSchema);
