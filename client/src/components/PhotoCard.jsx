import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const PhotoCard = ({ review }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    {/* delete later */}
    <Button variant="primary" onClick={handleShow}>
      Launch photo card
    </Button>

    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Card>
        <div className="card-horizontal">
          <Card.Img variant="left" src="http://placeimg.com/400/400" />
          <Card.Body>
            <Button className="exit-btn" onClick={handleClose}>
              X
            </Button>
            <Card.Title>
              Date<div>username</div>
            </Card.Title>
            <Card.Text>
              {review.body}
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
    </Modal>
    </>
  )
}

export default PhotoCard;
