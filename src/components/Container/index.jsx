import React from 'react';
import './index.css'; // Styling for the container

const Container = ({ children }) => {
  return (
    <div className='container'>
      {children}
    </div>
  );
};

export default Container;
