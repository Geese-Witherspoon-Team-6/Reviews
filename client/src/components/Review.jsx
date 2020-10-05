import React from 'react';

const Review = ({ review, clickReviewPhoto, clickHelpful }) => (
  <div>
    <div>{review.userName} {review.createdAt}</div>
    <div>{review.rating} / 5</div>
    <div>{review.body}</div>
    <div>Purchased item: {review.itemName}</div>
    {review.imageUrl !== null &&
      <div>
        <img onClick={clickReviewPhoto} id={review._id} src={review.imageUrl}></img>
      </div>}
    {/* Note: the following div should only be rendered if the user is logged in */}
    <div>
      <button onClick={clickHelpful} className="helpful-btn" id={review._id} >Is this helpful?</button>
      <div id={`${review._id}-thanks`} style={{display: 'none'}}>Thanks for your feedback!</div>
    </div>
  </div>
)

export default Review;
