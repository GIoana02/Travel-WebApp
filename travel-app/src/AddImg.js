import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";

function AddImg() {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const requestOptions = {
        method: 'POST',
        body: formData,
      };

      const response = await fetch('http://localhost:8000/images/upload-image', requestOptions);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <div className="header1">
        {/* Rest of your UI components */}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <input onChange={fileChangeHandler} name="image" type="file" accept=".jpeg, .png, .jpg" />
          </fieldset>
          <button type="submit">Upload</button>
        </form>
        {/* Rest of your UI components */}
      </div>
    </div>
  );
}

export default AddImg;
