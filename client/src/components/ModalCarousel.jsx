import React from 'react';
// import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import ModalHeader from 'react-bootstrap/ModalHeader';
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
          <img src={review.imageUrl}></img>
          <div>
            <span>{review.createdAt}, {review.userName}</span>
            <p>{review.body}</p>
          </div>
        </Carousel.Item>)}
    </Carousel>
  </ModalStyled>
)

export default ModalCarousel;
