import React from 'react';
import Review from './Review.jsx'

const ReviewList = (props) => (
  <div>
    {props.reviews.map((review, idx) => <Review review={review} key={idx} />)}
  </div>
)

export default ReviewList;
