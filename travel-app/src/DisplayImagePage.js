import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ImageDisplay from './ImageDisplay';

const DisplayImagePage = () => {
  const { imageName } = useParams();
  const location = useLocation();

  return (
    <div>
      <h1>Displaying Image</h1>
      <ImageDisplay imageName={imageName} />
    </div>
  );
};

export default DisplayImagePage;
