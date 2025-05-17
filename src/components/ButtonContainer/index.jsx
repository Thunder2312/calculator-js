import React from 'react';
import './index.css';

// Define buttons as an object
const buttons = {
  row1: ['6', '7', '8', '9'],
  row2: ['2', '3', '4', '5'],
  row3: ['0', '1', '.', '+'],
  row4: ['*', '-', '/', '='],
  row5: ['%', 'x^2', '<-', 'AC']
};

const ButtonContainer = ({ onButtonClick }) => {
  return (
    <div className="numbers">
      {Object.keys(buttons).map((row, index) => (
        <div className="button-row" key={index}>
          {buttons[row].map((button, buttonIndex) => (
            <button
              key={buttonIndex}
              onClick={() => onButtonClick(button)}>
              {button}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ButtonContainer;
