const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise // note: necessary only because using v4

const reviewSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userThumb: String,
  createdAt: Date,
  rating: Number,
  body: String,
  itemId: Number,
  itemName: String,
  itemThumb: String,
  storeId: Number,
  imageUrl: String
},
{
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
