const app = require('./app.js')
const port = 3001

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
