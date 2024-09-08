import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyAccessToken, refreshAccessToken, clearTokens } from './authservice';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      let isMounted = true;
    
      const verifyToken = async () => {
        try {
          await verifyAccessToken();
          if (isMounted) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          try {
            await refreshAccessToken();
            if (isMounted) {
              setIsAuthenticated(true);
            }
          } catch (error) {
            clearTokens();
            if (isMounted) {
              navigate('/login');
            }
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };
    
      verifyToken();
    
      return () => {
        isMounted = false;
      };
    }, [navigate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // lub inna obsługa w przypadku, gdy użytkownik nie jest uwierzytelniony
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
