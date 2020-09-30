import React, { useState } from 'react';
import { CarouselItem } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const PhotoCarousel = ({ photos, popUpReview }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <Carousel activeIndex={index} indicators={false} interval={null} wrap={false} onSelect={handleSelect}>
      {photos.map((slide, idx) => {
        return <CarouselItem key={idx}>
          {slide.map((photo, idx) => (
            <div className="carousel-img d-inline" key={idx} onClick={popUpReview}>
              <img src={photo.imageUrl} id={photo._id} key={idx}></img>
            </div>
          ))}
        </CarouselItem>
      })}
    </Carousel>
  )
}

export default PhotoCarousel;
