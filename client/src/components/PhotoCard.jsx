import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const PhotoCard = ({ review, show, toggleShow }) => (
  <Modal show={show} onHide={toggleShow} size="lg" centered>
    <Card>
      <div className="card-horizontal">
        <Card.Img variant="left" src={review.imageUrl} />
        <Card.Body>
          <Button className="exit-btn" onClick={toggleShow}>
            X
          </Button>
          <Card.Title>
            {review.createdAt}<div>{review.userName}</div>
          </Card.Title>
          <Card.Text>
            {review.body}
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  </Modal>
)

export default PhotoCard;
