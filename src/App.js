import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar'; // Certifique-se de que o caminho está correto

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Sidebar />
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
    </ChakraProvider>
  );
}

export default App;
