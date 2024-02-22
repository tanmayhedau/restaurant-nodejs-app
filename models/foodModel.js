const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Food title is required']
  },
  description: {
    type: String,
    required: [true, 'Food description is required']
  },
  price: {
    type: String,
    required: [true, 'Food price is required']
  },
  imageUrl: {
    type: String,
    default: 'https://th.bing.com/th?id=OIP.F12PmH91RUP3obEOwp8TewHaIu&w=230&h=271&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
  },
  foodTags: {
    type: String
  },
  category: {
    type: String
  },
  code: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  ratingCount: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);