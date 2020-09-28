const mongoose = require('mongoose');
const Review = require('./Review.js');
mongoose.Promise = global.Promise;

const getItem = function(itemId) {
  return Review.find({ itemId }).sort({ createdAt: -1 });
};

const getStoreId = function(itemId) {
  return Review.find({ itemId })
    .then((docs) => {
      return docs[0].storeId;
    })
}

const getStore = function(storeId) {
  return Review.find({ storeId }).sort({ createdAt: -1 });
}

const getPhoto = function(itemId, storeId) {
  return Promise.all([
    Review.find({ itemId, imageUrl: { $ne: null } }).sort({ createdAt: -1 }),
    Review.find({ storeId, imageUrl: { $ne: null } }).sort({ createdAt: -1 }),
  ])
    .then((results) => {
      return results[0].concat(results[1]);
    });
}

module.exports = {
  getItem,
  getStore,
  getPhoto,
  getStoreId
}
