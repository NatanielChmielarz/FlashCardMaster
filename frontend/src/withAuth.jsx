import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccessToken, refreshAccessToken, clearTokens } from './authservice';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        }
      };

      verifyToken();
    }, []);

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        // navigate('/login'); // Przekierowanie na stronę logowania po zakończeniu weryfikacji
      }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // Lub komponent logowania, lub inny komunikat
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
