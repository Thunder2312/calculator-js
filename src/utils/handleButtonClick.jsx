import { evaluate } from 'mathjs';

export const handleButtonClick = (value, display, setDisplay) => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
  const operators = ['+', '-', '*', '/', '%', '^'];

  if (value === '=') {
    // Evaluate the expression when '=' is pressed
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
    return;
  }

  if (value === 'AC') {
    // Clear the display when 'AC' is pressed
    setDisplay('');
    return;
  }

  if (value === '<-') {
    // Backspace logic (remove last character)
    if (isMobileDevice && window.__mobileInputControl) {
      window.__mobileInputControl.deleteAtCursor();
      return;
    } else {
      setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
      return;
    }
  }

  if (isMobileDevice && window.__mobileInputControl) {
    // Handle mobile input cursor position
    window.__mobileInputControl.insertAtCursor(value);
    return;
  }

  // Desktop logic (fallback)
  setDisplay((prevDisplay) => {
    const lastChar = prevDisplay.slice(-1);
    const lastNumberSegment = prevDisplay.split(/[\+\-\*\/\%\^]/).pop();

    // Prevent adding an operator if the last character is already an operator
    if (prevDisplay === '' && ['+', '*', '/', '%', '^'].includes(value)) {
      return prevDisplay;
    }

    if (operators.includes(lastChar) && operators.includes(value)) {
      if (!(lastChar === '^' && value === '-')) {
        return prevDisplay;
      }
    }

    // Prevent adding more than one decimal point in the same number
    if (value === '.' && lastNumberSegment.includes('.')) {
      return prevDisplay;
    }

    // Handle initial decimal input (e.g., '.')
    if (value === '.' && (prevDisplay === '' || operators.includes(lastChar))) {
      return prevDisplay + '0.';  // This ensures '0.' is entered before the decimal
    }

    if (value === 'x^2') {
      return prevDisplay + '^2';
    }

    return prevDisplay + value;
  });
};
