import React from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const Review = ({ review, clickReviewPhoto, clickHelpful }) => {
  let stars = [];
  for (var i = 0; i < review.rating; i++) {
    stars.push(
    <span className="star-icon">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="3 3 18 18"
      aria-hidden="true"
      focusable="false">
        <path d="M20.83,9.15l-6-.52L12.46,3.08h-.92L9.18,8.63l-6,.52L2.89,10l4.55,4L6.08,19.85l.75.55L12,17.3l5.17,3.1.75-.55L16.56,14l4.55-4Z"></path>
      </svg>
    </span>);
  }

  return (
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
      <div className="rating">
        {stars}
      </div>
      <Container className="review-body" fluid>
        <Row>
          <Col>{review.body}</Col>
          {review.imageUrl && <Col xs={3}>
            <img
              onClick={clickReviewPhoto}
              id={review._id}
              src={review.imageUrl}
              className="review-photo"></img>
          </Col>}
        </Row>
      </Container>
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
      <div className="thanks-dialog">
        <Button
          variant="light"
          onClick={clickHelpful}
          id={review._id} >
          Is this review helpful?
        </Button>
        <p id={`${review._id}-thanks`} style={{display: 'none'}}>Thanks for your feedback!</p>
      </div>
    </Media.Body>
  </Media>
)}

export default Review;
