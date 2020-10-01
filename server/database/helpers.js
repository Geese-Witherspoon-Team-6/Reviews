const mongoose = require('mongoose');
const Review = require('./Review.js');
mongoose.Promise = global.Promise;

const getItem = function(itemId, sort) {
  if (sort === 'new') {
    return Review.find({ itemId }).sort({ createdAt: -1 });
  } else {
    return Review.find({ itemId }).sort({ helpful: -1, createdAt: -1 })
  }
};

const getStoreId = function(itemId) {
  return Review.find({ itemId })
    .then((docs) => {
      return docs[0].storeId;
    })
}

const getStore = function(storeId, sort) {
  if (sort === 'new') {
    return Review.find({ storeId }).sort({ createdAt: -1 });
  } else {
    return Review.find({ storeId }).sort({ helpful: -1, createdAt: -1 })
  }
}

const getPhoto = function(itemId, storeId) {
  return Promise.all([
    Review.find({ itemId, imageUrl: { $ne: null } }).sort({ createdAt: -1 }),
    Review.find({ storeId, imageUrl: { $ne: null } }).sort({ createdAt: -1 }),
  ])
    .then((results) => {
      return results[0].concat(results[1]).slice(0, 20);
    });
}

const patchHelpful = function(reviewId) {
  return Review.findById(reviewId, 'helpful')
    .then((review) => {
      return Review.findByIdAndUpdate(review._id, { helpful: (review.helpful + 1) }, { new: true });
    });
}

module.exports = {
  getItem,
  getStore,
  getPhoto,
  getStoreId,
  patchHelpful
}
