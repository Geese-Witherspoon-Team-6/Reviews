import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CarouselImageStyled } from '../styled-components.jsx';

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
            <CarouselImageStyled key={photoIdx} onClick={carouselClick}>
              <img src={photo.imageUrl} id={slideIdx * 4 + photoIdx} key={photoIdx}></img>
            </CarouselImageStyled>
          ))}
        </Carousel.Item>
      })}
    </Carousel>
  )
}

export default PhotoCarousel;
