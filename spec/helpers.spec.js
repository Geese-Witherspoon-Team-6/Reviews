const mongoose = require('mongoose')
const faker = require('faker')
const Review = require('../server/database/Review.js')
const helper = require('../server/database/helpers.js')
const dbName = 'helperTest'

var testReviews = [{
  userId: 'BigBird',
  itemId: 1,
  storeId: 0,
  createdAt: faker.date.past(),
  helpful: 0
},
{
  userId: 'noodleManxD',
  itemId: 1,
  storeId: 0,
  createdAt: faker.date.past(),
  imageUrl: faker.image.imageUrl(),
  helpful: 3
},
{
  userId: 'elmo',
  itemId: 2,
  storeId: 0,
  createdAt: faker.date.future(),
  imageUrl: faker.image.imageUrl(),
  helpful: 1
}]

beforeAll(async () => {
  await mongoose.connection.close();
  await mongoose.connect(`mongodb://localhost/${dbName}`)
})

beforeEach(async () => {
  await Review.create(testReviews)
})

afterEach(async () => {
  await mongoose.connection.db.dropCollection('reviews')
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase()
  await mongoose.connection.close()
})

describe('Database helper functions', () => {

  describe('getStoreId', () => {
    it('should get back the storeId when given the itemId', async () => {
      var firstStore = await helper.getStoreId(1);
      var secondStore = await helper.getStoreId(2);

      expect(firstStore).toBe(secondStore);
    });
  })

  describe('getItem', () => {
    it('should get back an array of reviews', () => {
      return helper.getItem(1).then((reviews) => {
        expect(reviews.length).not.toBe(0);
      })
    });

    it('should get reviews in reverse-chronological order', () => {
      return helper.getItem(1).then((reviews) => {
        expect(reviews[0].createdAt > reviews[1].createdAt).toBe(true);
      })
    });

    it('should only get reviews for a specific item', () => {
      return helper.getItem(2).then((reviews) => {
        expect(reviews.length).toBe(1);
        expect(reviews[0].itemId).toBe(2);
      })
    });
  });

  describe('getStore', () => {
    it('should get back an array of all reviews for a store', () => {
      return helper.getStore(0).then((reviews) => {
        expect(reviews.length).toBe(3);
        expect(Array.isArray(reviews)).toBe(true);
      })
    });

    it('should get reviews in reverse-chronological order', () => {
      return helper.getStore(0).then((reviews) => {
        var chrono = reviews.slice().sort((a, b) => b.createdAt - a.createdAt);
        expect(reviews).toEqual(chrono);
      })
    });
  });

  describe('getPhoto', () => {
    it('should get back an array of only reviews that have photos', () => {
      return helper.getPhoto(1, 0).then((reviews) => {
        reviews.forEach((review) => {
          expect(review.imageUrl).not.toBe(null);
        })
      })
    });

    it('should order item-specific reviews before other store reviews', () => {
      return helper.getPhoto(1, 0).then((reviews) => {
        expect(reviews[0].itemId).not.toBe(reviews[1].itemId);
      })
    });
  });

  describe('patchHelpful', () => {
    it('should increment a review\'s helpful field', async () => {
      var review = await Review.findOne({ userId: 'BigBird' });
      var before = await Review.findById(review._id);
      await helper.patchHelpful(review._id);
      var after = await Review.findById(review._id);

      expect(after.helpful).toBe(before.helpful + 1);
    })
  });

});
