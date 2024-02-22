const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true, 'Category title is required']
  },
  imageUrl: {
    type: String,
    default:'https://th.bing.com/th?id=OIP.5c1a18GU5fHBD6LL2CPbZwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);