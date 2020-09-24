const faker = require('faker');
const Review = require('./Review.js');
const db = require('./index.js');

const mockData = [];

// Mock Data
for (var i = 1; i <= 100; i++) {
  for (var j = 0; j < 5; j++) {
    var itemName = `${faker.commerce.productName()} - ${faker.commerce.productAdjective()}, ${faker.commerce.department()}`;
    // all product thumbnails will be the same, regardless of different itemIds; fix for SDC
    var itemThumb = faker.image.imageUrl();

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
      imageUrl: 'https://picsum.photos/400'
    }

    mockData.push(newReview);
  }
}

// Editing data for demo
for (var i = 0; i < 5; i++) {
  mockData[i].itemName = 'The Risk I Took Card - Bird - Greeting - Math - Humor - Mincing Mockingbird';
  mockData[i].itemThumb = 'https://i.etsystatic.com/5135077/d/il/1273fe/373402287/il_75x75.373402287_ckmq.jpg?version=0';
}

// Inserting seed data
const insertMockData = function() {
  Review.create(mockData)
    .then(() => { db.close(); });
};

insertMockData();
