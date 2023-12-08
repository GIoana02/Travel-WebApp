import React, { useState } from 'react';
import axios from 'axios';
import api from './api'

const DisplayImage = () => {
  const [imageName, setImageName] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setImageName(event.target.value);
  };

  const getImage = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/images/display-image/${imageName}`, {
        responseType: 'blob', // Set responseType to 'blob' to handle binary data
      });

      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = reader.result;

        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // Adjust the maximum width as needed
          const maxHeight = 300; // Adjust the maximum height as needed
          let width = image.width;
          let height = image.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;

            if (width > height) {
              width = maxWidth;
              height = width / aspectRatio;
            } else {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);

          const resizedImageUrl = canvas.toDataURL('image/jpeg'); // Change format if needed

          setImageSrc(resizedImageUrl);
          setLoading(false);
        };
      };
      reader.readAsDataURL(response.data);

    } catch (error) {
      console.error('There was a problem fetching the image:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter image name"
          value={imageName}
          onChange={handleInputChange}
        />
        <button onClick={getImage}>Fetch Image</button>
      </div>
      {loading ? (
        <p>Loading image...</p>
      ) : imageSrc ? (
        <img src={imageSrc} alt={imageName} />
      ) : (
        <p>No image to display</p>
      )}
    </div>
  );
};

export default DisplayImage;
