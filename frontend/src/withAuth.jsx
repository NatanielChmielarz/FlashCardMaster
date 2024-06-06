import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccessToken, refreshAccessToken, clearTokens } from './authservice';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        try {
          await verifyAccessToken();
          setIsAuthenticated(true);
        } catch (error) {
          try {
            await refreshAccessToken();
            setIsAuthenticated(true);
          } catch (error) {
            clearTokens();
            setIsAuthenticated(false);
          }
        } finally {
          setIsLoading(false);
          setHasCheckedAuth(true);
        }
      };

      if (!hasCheckedAuth) {
        verifyToken();
      }
    }, [navigate, hasCheckedAuth]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      navigate('/login'); // Przekierowanie tylko raz
      return null; // lub komponent logowania
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
