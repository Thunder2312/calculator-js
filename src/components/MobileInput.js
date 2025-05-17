import React from 'react';
import { evaluate } from 'mathjs';

const MobileInput = ({ display, setDisplay }) => {
  const handleChange = (e) => {
    setDisplay(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      try {
        const result = evaluate(display);
        setDisplay(result.toString());
      } catch {
        setDisplay('Error');
      }
    }
  };

  return (
    <input
      type="text"
      value={display}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter calculation"
      inputMode="decimal"
      style={{
        fontSize: '1.5rem',
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        boxSizing: 'border-box',
      }}
    />
  );
};

export default MobileInput;
