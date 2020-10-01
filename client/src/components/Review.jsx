import React from 'react';

const Review = ({ review, handleClick }) => (
  <div>
    <div>{review.userName} {review.createdAt}</div>
    <div>{review.rating} / 5</div>
    <div>{review.body}</div>
    <div>Purchased item: {review.itemName}</div>
    {review.imageUrl !== null &&
      <div>
        <img onClick={handleClick} id={review._id} src={review.imageUrl}></img>
      </div>}
  </div>
)

export default Review;
