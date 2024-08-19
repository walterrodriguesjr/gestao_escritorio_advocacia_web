// PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated() ? children : <Navigate to="/login" />; // Redireciona para a tela de login se não estiver autenticado
}

export default PrivateRoute;
