import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken');
    const location = useLocation(); 

    console.log('Auth token from localStorage:', authToken);

    if (!authToken) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
