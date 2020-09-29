import React, { useState } from 'react';
import { CarouselItem } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const PhotoCarousel = ({ photos }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <Carousel activeIndex={index} indicators={false} interval={null} wrap={false} onSelect={handleSelect}>
      {photos.map((slide, idx) => {
        return <CarouselItem>
          {slide.map((photo, idx) => (
            <div className="carousel-img d-inline">
              <img src={photo.imageUrl} key={idx}></img>
            </div>
          ))}
        </CarouselItem>
      })}
    </Carousel>
  )
}

export default PhotoCarousel;
