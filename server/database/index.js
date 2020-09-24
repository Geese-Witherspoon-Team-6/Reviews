const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/qtsy')

module.exports = db;
