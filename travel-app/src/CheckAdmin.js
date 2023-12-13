import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import decodeToken from "./DecodeToken"; // Import your token decoding library

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const checkAdminStatus = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        history('/login');
      } else {
        try {
          const decodedToken = decodeToken(token);
          if (decodedToken && decodedToken.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            history('/login');
          }
        } catch (error) {
          console.error('Error decoding token:', error.message);
        }
      }
    };

    checkAdminStatus();
  }, [history]);

  return isAdmin;
};

export default useAdminCheck;
