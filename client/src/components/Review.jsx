import React from 'react';

const Review = ({ review }) => (
  <div>
    <div>{review.userName} {review.createdAt}</div>
    <div>{review.rating} / 5</div>
    <div>{review.body}</div>
    <div>Purchased item: {review.itemName}</div>
  </div>
)

export default Review;
