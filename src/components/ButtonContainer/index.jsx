import React from 'react';
import './index.css';

// Define buttons as an object
const buttons = {
  row1: ['AC','.','/','%'],
  row2: ['0','x^2','<-','*'],
  row3: ['7', '8', '9', '-'],
  row4: ['4', '5', '6', '+'],
  row5: ['1', '2', '3', '=']
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
