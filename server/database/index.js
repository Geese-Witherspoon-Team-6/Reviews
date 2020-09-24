const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qtsy');
const db = mongoose.connection;

module.exports = db;
