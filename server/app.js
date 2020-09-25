const express = require('express')
const path = require('path')
const reviews = require('./database/helpers.js')
const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../client/dist')))

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
