import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
