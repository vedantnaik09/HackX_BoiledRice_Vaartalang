import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndex } from '../slices/generalSlice';
import './carousel.css'
const Carousel = ({ images }) => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.counter.index);
  const totalSlides = images.length;
  const [loadedIndex, setLoadedIndex] = useState(currentIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(setIndex((currentIndex + 1) % totalSlides));
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, dispatch]);

  useEffect(() => {
    setLoadedIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="relative w-80 h-80  max-lg:w-60 max-lg:h-60">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === loadedIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 

            src={image}
            alt={`Slide ${index + 1}`}
            className='w-full h-full object-cover carousel-image'
            onLoad={() => setLoadedIndex(currentIndex)} // Trigger re-render when image is loaded
            draggable="false"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
