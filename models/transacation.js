const mongoose = require("mongoose");

const TransacationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: [true, "Please provide the id"],
    },

    title: {
      type: String,
      required: [true, "Please provide the title"],
    },

    price: {
      type: Number,
      required: [true, "Please provide the price"],
    },

    description: {
      type: String,
      required: [true, "Please provide the description"],
    },

    category: {
      type: String,
      required: [true, "Please provide the category"],
    },

    image: {
      type: String,
      required: [true, "Please provide the imageUrl"],
    },

    sold: {
      type: Boolean,
      required: [true, "Please provide the value for sold"],
    },

    dateOfSale: {
      type: Date,
      required: [true, "Please provide the value for dateOfSale"],
    },

    month: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transacations", TransacationSchema);
