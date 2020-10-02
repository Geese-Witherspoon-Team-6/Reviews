import React from 'react';
import Media from 'react-bootstrap/Media';
import moment from 'moment';

const Review = ({ review, clickReviewPhoto, clickHelpful }) => (
  <Media className="review space">
    <img
      width={36}
      height={36}
      className="user-icon"
      src={review.userThumb}
      alt="User Image"
    />
    <Media.Body className="align-center">
      <p className="quiet-text">
        <span className="link">{review.userName}</span>
        {moment(review.createdAt).format('ll')}
      </p>
      <div>{review.rating} / 5</div>
      <p>
        {review.body}
      </p>
      <div className="quiet-text">Purchased Item:</div>
      <Media>
        <img
          width={36}
          height={36}
          className="item-icon"
          src={review.itemThumb}
          alt="Item Thumbnail"
        />
        <Media.Body>
          <div className="link quiet-text">{review.itemName}</div>
        </Media.Body>
      </Media>
    </Media.Body>
  </Media>
  // <div>
  //   <div>{review.userName} {review.createdAt}</div>
  //   <div>{review.rating} / 5</div>
  //   <div>{review.body}</div>
  //   <div>Purchased item: {review.itemName}</div>
  //   {review.imageUrl !== null &&
  //     <div>
  //       <img onClick={clickReviewPhoto} id={review._id} src={review.imageUrl}></img>
  //     </div>}
  //   {/* Note: the following div should only be rendered if the user is logged in */}
  //   <div>
  //     <button onClick={clickHelpful} className="helpful-btn" id={review._id} >Is this helpful?</button>
  //     <div id={`${review._id}-thanks`} style={{display: 'none'}}>Thanks for your feedback!</div>
  //   </div>
  // </div>
)

export default Review;
