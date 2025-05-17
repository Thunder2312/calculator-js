import React from 'react';
import './index.css'; // Optional: If you want to add some custom styling to the instructions.

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>How to Use the Calculator</h2>
      <p><strong>1. Input Numbers & Operators:</strong></p>
      <p>Click on the buttons or use your keyboard to enter numbers, operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, <code>^</code>), and special functions like <code>x^2</code> or <code>x^y</code>.</p>
      <p>Use the <code>.</code> button for decimal points.</p>

      <p><strong>2. Perform Calculations:</strong></p>
      <p>To calculate the result, click the <code>=</code> button or press <code>Enter</code> on your keyboard. The calculator will show the result on the screen.</p>

      <p><strong>3. Clear Your Input:</strong></p>
      <p>To clear the entire display, click the <code>AC</code> button or press the <code>Delete</code> key on your keyboard.</p>

      <p><strong>4. Delete the Last Character:</strong></p>
      <p>To remove the last character or operator entered, press the <code>Backspace</code> key on your keyboard.</p>

      <p><strong>5. Special Functions:</strong></p>
      <p><code>x^2</code>: Square the current number.</p>
      <p><code>x^y</code>: Raise a number to the power of another number.</p>

      <p><strong>Error Handling:</strong></p>
      <p>If you input an invalid calculation (like only <code>=</code>), the display will show an "Error" message. Try to make sure your input is valid, and feel free to clear and start over if needed!</p>
    </div>
  );
};

export default Instructions;
