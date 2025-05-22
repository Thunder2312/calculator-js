import React from 'react';
import './index.css';

const Answer = ({ display, inputRef }) => {
  return (
    <div className="answer">
      <input
        ref={inputRef}  // Assign ref for cursor management
        type="text"
        value={display}
           // Prevent typing directly into the input (managed by handleKeyPress)
        autoFocus
         // Style as needed
      />
    </div>
  );
};

export default Answer;
