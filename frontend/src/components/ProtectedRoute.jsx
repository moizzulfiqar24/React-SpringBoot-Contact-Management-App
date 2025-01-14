import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');
    const location = useLocation(); // Get the current location

    console.log('Auth token from localStorage:', authToken);

    if (!authToken) {
        // Redirect to /login and preserve the path to return after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
