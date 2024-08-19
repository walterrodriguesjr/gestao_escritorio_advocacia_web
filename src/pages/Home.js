import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-wrapper">
        {/* Conteúdo principal da página */}
        <div className="content">
          <div className="container-fluid">
            <h1>Welcome to the Home Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
