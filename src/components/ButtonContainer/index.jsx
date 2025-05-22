import React from 'react';
import './index.css';

const buttons = {
  row1: ['AC', '.', '/', '%'],
  row2: ['0', 'x^2', '<-', '*'],
  row3: ['7', '8', '9', '-'],
  row4: ['4', '5', '6', '+'],
  row5: ['1', '2', '3', '=']
};

const ButtonContainer = ({ onButtonClick }) => {
  const isNumber = (val) => !isNaN(val) && val !== ' ';
  const isOperator = (val) => ['+', '-', '*', '/', '%', '='].includes(val);
  const isFunctional = (val) => ['AC', '.', '<-', 'x^2'].includes(val);

  return (
    <div className="numbers">
      {Object.keys(buttons).map((row, index) => (
        <div className="button-row" key={index}>
          {buttons[row].map((button, buttonIndex) => {
            let className = '';
            if (isNumber(button)) {
              className = 'number-button';
            } else if (isOperator(button)) {
              className = 'operator-button';
            } else if (isFunctional(button)) {
              className = 'functional-button';
            }

            return (
              <button
                key={buttonIndex}
                className={className}
                onClick={() => onButtonClick(button)}
              >
                {button}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ButtonContainer;