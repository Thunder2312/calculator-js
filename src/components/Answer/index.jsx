import React from 'react';
import './index.css';

const Answer = ({ display, inputRef }) => {
  return (
    <div className="answer">
      <input
        ref={inputRef}  
        type="text"
        value={display}    
        autoFocus
      />
    </div>
  );
};

export default Answer;
