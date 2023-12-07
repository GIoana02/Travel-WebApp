import React, { useState, useEffect } from 'react';
import api from './api'
const ImageDisplay = ({ imageName }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.get(`/images/display-image/${imageName}`);
        if (response.ok) {
          const blob = await response.blob();
          setImageUrl(URL.createObjectURL(blob));
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [imageName]);

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageName}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageDisplay;
