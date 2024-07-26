
import { Outlet, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const expiration = localStorage.getItem('ACCESS_TOKEN_EXPIRATION');
  
    if (!token || !expiration) {
      return false;
    }
  
    console.log(token);
    const isTokenExpired = new Date().getTime() > expiration;
    return !isTokenExpired;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;