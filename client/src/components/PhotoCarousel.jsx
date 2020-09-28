import React from 'react';
import PhotoSlide from './PhotoSlide.jsx';

const PhotoCarousel = ({ photos }) => (
  <div>Photos from Reviews
    {photos.map((photo, idx) => <PhotoSlide url={photo.imageUrl} key={idx} />)}
  </div>
)

export default PhotoCarousel;
