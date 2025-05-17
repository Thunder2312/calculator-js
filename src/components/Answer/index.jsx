import React from 'react';
import './index.css';


const Answer = ({ display }) => {
  return (
    <div className="answer">
      <input 
        type="text" 
        value={display} 
        autoFocus 
      />
    </div>
  );
};

export default Answer; 