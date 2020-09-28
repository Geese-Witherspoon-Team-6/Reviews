const express = require('express')
const path = require('path')
const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/listing/:itemId', express.static(path.join(__dirname, '../client/dist')))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
