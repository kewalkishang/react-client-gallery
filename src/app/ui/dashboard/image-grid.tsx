"use client"
import { useState } from 'react';
import ImageModal from './image-modal';

export default function ImageGrid({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  
    const handleCloseModal = () => {
      setSelectedImage(null);
    };

    return (
        <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
         <div key={index} className="w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 aspect-w-1 aspect-h-1 cursor-pointer" onClick={() => handleImageClick(image)}>
         <img src={image} alt={`Image ${index}`} className="w-full h-full object-contain" />
       </div>
        ))}
      </div>
      <ImageModal imageSrc={selectedImage} onClose={handleCloseModal} />
    </>
    );
  }