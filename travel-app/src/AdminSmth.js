import React, { useEffect, useState } from 'react';

function decodeToken(token) {
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const payload = atob(tokenParts[1]);
  const decodedToken = JSON.parse(payload);
  return decodedToken;
}

const CheckAdminPage = () => {
  const [userStatus, setUserStatus] = useState('');
  const [decodedTokenContent, setDecodedTokenContent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token to ensure it exists

    if (token) {
      try {
        const decodedToken = decodeToken(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token
        setDecodedTokenContent(decodedToken); // Set decoded token content to state

        if (decodedToken && decodedToken.isAdmin) {
          setUserStatus('Admin');
        } else {
          setUserStatus('User');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserStatus('Error decoding token');
      }
    } else {
      setUserStatus('Not logged in');
    }
  }, []);

  return (
    <div>
      <h1>User Status</h1>
      <p>{`User is: ${userStatus}`}</p>
      <h2>Decoded Token Content:</h2>
      <pre>{JSON.stringify(decodedTokenContent, null, 2)}</pre>
    </div>
  );
};

export default CheckAdminPage;
