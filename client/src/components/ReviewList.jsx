import React from 'react';
import Review from './Review.jsx'

const ReviewList = ({ reviews, handleReviewClick }) => (
  <div>
    {reviews.map((review, idx) => <Review review={review} handleClick={handleReviewClick} key={idx} />)}
  </div>
)

export default ReviewList;
