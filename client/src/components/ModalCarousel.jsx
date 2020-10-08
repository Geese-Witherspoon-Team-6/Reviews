import React from 'react';
import moment from 'moment';
// import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ModalHeader from 'react-bootstrap/ModalHeader';
import Stars from '../components/Stars.jsx';
import { ModalStyled } from '../styled-components.jsx';

const ModalCarousel = ({ reviewIdx, reviews, show, isCarousel, toggleShow, handleSelect }) => (
  <ModalStyled show={show} onHide={toggleShow} centered>
    <ModalHeader closeButton></ModalHeader>
    <Carousel
      activeIndex={reviewIdx}
      indicators={false}
      interval={null}
      slide={false}
      onSelect={handleSelect}
      controls={isCarousel} >
      {reviews.map((review, idx) =>
        <Carousel.Item key={idx}>
          <Row>
            <Col><img className="review-img" src={review.imageUrl}></img></Col>
            <Col xs={5}>
              <Row className="review-text">
                <Col xs={2}> <img width={36} height={36} className="user-icon" src={review.userThumb}/>
                </Col>
                <Col>
                <div>{moment(review.createdAt).format('ll')}</div>
                <div className="username">{review.userName}</div>
                </Col>
              </Row>
              <div className="body">
                <Stars rating={review.rating} isHalf={false}/>
                <p>{review.body}</p>
              </div>
            </Col>
          </Row>

        </Carousel.Item>)}
    </Carousel>
  </ModalStyled>
)

export default ModalCarousel;
