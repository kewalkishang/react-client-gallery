"use client"
import { useState } from 'react';
import ImageModal from './image-modal';
import { useSelector, useDispatch } from 'react-redux'
import { setDescription, removeDescription} from '../../../lib/features/imageData/descriptionSlice';
import { fetchDescriptions, deleteDescription} from '../../../lib/features/imageData/descriptionSlice';

export default function ImageGrid({ images }) {
    const [selectedImage, setSelectedImage] = useState(null);
   // const [bookmarkedImages, setBookmarkedImages] = useState([]);
    const descriptions = useSelector(state => state.descriptions);
    const dispatch = useDispatch()

    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  
    const handleCloseModal = () => {
      setSelectedImage(null);
    };

    const toggleBookmark = (image) => {
      if (Object.keys(descriptions).includes(image)) {

        dispatch(deleteDescription([{ imageId: image }]));
        dispatch(removeDescription(image));
      } else {
        dispatch(setDescription({ image, description: '' }));
      }
    };
  
    const isBookmarked = (image) => Object.keys(descriptions).includes(image);
  
      // Update the description for a specific image
    const updateDescription = (image, newDescription) => {
      dispatch(setDescription({ image, description: newDescription }));
    };

    // Retrieve the description for the currently selected image, if it exists
    //console.log({ selectedImage, descriptions });
    const getCurrentDescription = () => descriptions?.[selectedImage] ?? '';


    return (
        <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((image, index) => (
         <div key={index} className="w-full overflow-hidden rounded-lg shadow-lg bg-gray-200 aspect-w-1 aspect-h-1 cursor-pointer relative" onClick={() => handleImageClick(image)}>
         <img src={image} alt={`Image ${index}`} className="w-full h-full object-contain" />
         <button className="absolute top-0 right-0 p-2 w" onClick={(e) => { e.stopPropagation(); toggleBookmark(image); }}>
              {isBookmarked(image) ? '★' : '☆'}
            </button>
       </div>
        ))}
      </div>
      <ImageModal imageSrc={selectedImage} onClose={handleCloseModal} isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} 
          description={getCurrentDescription()} // Pass the current description
          setDescription={(selectedImage, newDescription) => updateDescription(selectedImage, newDescription)} 
      />
    </>
    );
  }