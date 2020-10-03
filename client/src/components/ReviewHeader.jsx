import React from 'react';
import Stars from './Stars.jsx';

const ReviewHeader = ({ reviews }) => {
  let ratings = reviews.map((review) => review.rating);
  let mean = 0;
  if (ratings.length > 0) {
    mean = ratings.reduce((acc, rating) => (acc + rating) / 2);
    mean = Math.round(mean * 2) / 2;
  }

  return (
  <h2 id="reviews-count">
    {reviews.length} Reviews <Stars rating={mean} isHalf={mean % 1} />
  </h2>)
}

export default ReviewHeader;
