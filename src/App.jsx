import React, { useState, useEffect } from 'react';
import ButtonContainer from './components/ButtonContainer';
import Answer from './components/Answer';
import Container from './components/Container'; // Assuming this is used to wrap everything
import { evaluate } from 'mathjs';

const App = () => {
  const [display, setDisplay] = useState(''); // State to store input value

  // Function to handle button click and update the display
  const handleButtonClick = (value) => {
    if (value === '=') {
      // Evaluate the expression when '=' is clicked
      try {
        const result = evaluate(display);
        setDisplay(result.toString()); // Update display with result
      } catch (error) {
        setDisplay('Error'); // Show 'Error' if evaluation fails
      }
    } else if (value === 'C') {
      // Clear the display if 'C' is clicked
      setDisplay('');
    } else {
      // Append other valid keys to the display
      setDisplay((prevDisplay) => prevDisplay + value);
    }
  };

  // Function to handle keyboard events
  const handleKeyPress = (event) => {
    const key = event.key;

   // Prevent the default behavior when "Enter" key is pressed (e.g., form submission)
   if (key === 'Enter') {
    event.preventDefault();
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
    return;
  }

  if (/\d/.test(key) || ['+', '-', '*', '/', '=', '.', '%', '^', 'Backspace', 'Delete'].includes(key)) {
    if (key === 'Backspace') {
      setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
    } else if (key === 'Delete') {
      // Clear the display if 'Delete' is pressed
      setDisplay('');
    } else {
      // Append other valid keys to the display
      setDisplay((prevDisplay) => prevDisplay + key);
    }
  }
};

// Add event listener on mount and clean up on unmount
useEffect(() => {
  window.addEventListener('keydown', handleKeyPress);

  // Cleanup the event listener when component unmounts
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  };
}, [display]);

return (
  <Container>
    <Answer display={display} /> 
    <ButtonContainer onButtonClick={handleButtonClick} /> {/* Pass the function to ButtonContainer */}
  </Container>
);
};

export default App;