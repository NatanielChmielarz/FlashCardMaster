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
            navigate('/login');
          }
        } finally {
          setIsLoading(false); // Ustawienie isLoading na false, gdy proces weryfikacji się zakończy
        }
      };

      verifyToken();
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
