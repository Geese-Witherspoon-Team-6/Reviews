import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import ModalHeader from 'react-bootstrap/ModalHeader';

const ModalCarousel = ({ reviewIdx, reviews, show, toggleShow, handleSelect }) => (
  <Modal show={show} onHide={toggleShow} centered>
    <ModalHeader closeButton></ModalHeader>
    <Carousel activeIndex={reviewIdx} indicators={false} interval={null} onSelect={handleSelect}>
      {reviews.map((review, idx) =>
        <Carousel.Item key={idx}>
          <img src={review.imageUrl}></img>
          <div>
            <span>{review.createdAt}, {review.userName}</span>
            <p>{review.body}</p>
          </div>
        </Carousel.Item>)}
    </Carousel>
  </Modal>
)

export default ModalCarousel;
