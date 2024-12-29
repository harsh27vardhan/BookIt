const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "place",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  numberOfGuests: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: Number,
});
const BookingModel = mongoose.model("booking", bookingSchema);
module.exports = BookingModel;
