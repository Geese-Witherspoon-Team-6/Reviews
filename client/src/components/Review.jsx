import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import Stars from './Stars.jsx';
import { Helpful, ReviewStyled } from '../styled-components.jsx';

const Review = ({ review, clickReviewPhoto, clickHelpful }) => (
  <ReviewStyled>
    <img
      width={36}
      height={36}
      className="user-icon"
      src={review.userThumb}
      alt="User Image"
    />
    <ReviewStyled.Body className="align-center">
      <p className="quiet-text">
        <span className="link">{review.userName}</span>
        {moment(review.createdAt).format('ll')}
      </p>
      <Stars rating={review.rating} isHalf={false}/>
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
      <ReviewStyled>
        <img
          width={36}
          height={36}
          className="item-icon"
          src={review.itemThumb}
          alt="Item Thumbnail"
        />
        <ReviewStyled.Body>
          <div className="link quiet-text">{review.itemName}</div>
        </ReviewStyled.Body>
      </ReviewStyled>
      <Helpful >
        <Button
          variant="light"
          onClick={clickHelpful}
          id={review._id} >
          Is this review helpful?
        </Button>
        <p id={`${review._id}-thanks`} style={{display: 'none'}}>Thanks for your feedback!</p>
      </Helpful>
    </ReviewStyled.Body>
  </ReviewStyled>
)

export default Review;
