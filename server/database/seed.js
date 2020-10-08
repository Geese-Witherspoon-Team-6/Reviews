const faker = require('faker');
const Review = require('./Review.js');
const db = require('./index.js');
const images = require('./birds.js');

const mockData = [];
let reviewImageIdx = 0;

// Mock Data
for (var i = 1; i <= 100; i++) {
  for (var j = 0; j < 5; j++) {
    var itemName = `${faker.commerce.productName()} - ${faker.commerce.productAdjective()}, ${faker.commerce.department()}`;
    var itemThumb = images.birds[i % images.birds.length];
    var imageUrl = null;

    var hasPhoto = Boolean(Math.round(Math.random()));
    if (hasPhoto) {
      imageUrl = images.reviewImages[reviewImageIdx % images.reviewImages.length];
      reviewImageIdx++;
    }

    var newReview = {
      userId: faker.internet.userName(),
      userName: faker.name.findName(),
      userThumb: faker.image.avatar(),
      createdAt: faker.date.past(),
      rating: Math.ceil(Math.random() * 5),
      body: faker.lorem.sentences(),
      itemId: i,
      itemName: itemName,
      itemThumb: itemThumb,
      storeId: 1,
      imageUrl: imageUrl,
      helpful: Math.floor(Math.random() * 20)
    }

    mockData.push(newReview);
  }
}

// Editing data for demo
for (var i = 0; i < 5; i++) {
  mockData[i].itemName = 'The Risk I Took Card - Bird - Greeting - Math - Humor - Mincing Mockingbird';
  mockData[i].itemThumb = 'https://qtsy-reviews.s3.us-east-2.amazonaws.com/icon.jpg';
}

// Inserting seed data
const insertMockData = function() {
  Review.create(mockData)
    .then(() => { db.close(); });
};

insertMockData();
