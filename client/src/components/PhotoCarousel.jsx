import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const PhotoCarousel = ({ photos, carouselClick }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <Carousel activeIndex={index} indicators={false} interval={null} wrap={false} onSelect={handleSelect}>
      {photos.map((slide, slideIdx) => {
        return <Carousel.Item key={slideIdx}>
          {slide.map((photo, photoIdx) => (
            <div className="carousel-img d-inline" key={photoIdx} onClick={carouselClick}>
              <img src={photo.imageUrl} id={slideIdx * 4 + photoIdx} key={photoIdx}></img>
            </div>
          ))}
        </Carousel.Item>
      })}
    </Carousel>
  )
}

export default PhotoCarousel;
