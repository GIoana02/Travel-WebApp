import React, { useState } from 'react';
import api from './api';

function AddImg() {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await api.post('/images/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log('Image uploaded successfully');
        console.log(response.data); // Response data if any
      } else {
        console.error('Upload image failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <div className="header1">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input onChange={fileChangeHandler} name="image" type="file" accept=".jpeg, .png, .jpg" />
          </fieldset>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default AddImg;
