const path = require('path')
const SRC_DIR = path.join(__dirname, '/client/src')
const DIST_DIR = path.join(__dirname, 'client/dist')

module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'reviews.bundle.js',
    path: path.join(`${DIST_DIR}`)
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
}
