import React from 'react';
import Media from 'react-bootstrap/Media';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import Stars from './Stars.jsx';
import { Helpful } from '../styled-components.jsx';

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
      <Helpful >
        <Button
          variant="light"
          onClick={clickHelpful}
          id={review._id} >
          Is this review helpful?
        </Button>
        <p id={`${review._id}-thanks`} style={{display: 'none'}}>Thanks for your feedback!</p>
      </Helpful>
    </Media.Body>
  </Media>
)

export default Review;
