const mongoose = require("mongoose");
const PlaceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: String,
  description: String,
  address: String,
  photos: [String],
  price: Number,
  perks: [String],
  availableFrom: Date,
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: String,
});

const PlaceModel = mongoose.model("place", PlaceSchema);

module.exports = PlaceModel;
