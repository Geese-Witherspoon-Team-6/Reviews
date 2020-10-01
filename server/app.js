const express = require('express')
const path = require('path')
const reviews = require('./database/helpers.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/listing/:itemId', express.static(path.join(__dirname, '../client/dist')))

app.get('/api/item-reviews/:itemId', (req, res) => {
  reviews.getItem(req.params.itemId)
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.get('/api/store-reviews/:itemId', (req, res) => {
  reviews.getStoreId(req.params.itemId)
    .then((storeId) => {
      return reviews.getStore(storeId);
    })
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.get('/api/photo-reviews/:itemId', (req, res) => {
  reviews.getStoreId(req.params.itemId)
    .then((storeId) => {
      return reviews.getPhoto(req.params.itemId, storeId);
    })
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

app.patch('/api/helpful-review/:reviewId', (req, res) => {
  reviews.patchHelpful(req.params.reviewId)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
})

module.exports = app
