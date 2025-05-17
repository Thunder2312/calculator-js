import { evaluate } from 'mathjs';

export const handleButtonClick = (value, display, setDisplay) => {
  const operators = ['+', '-', '*', '/', '%', '^'];

  if (value === '=') {
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  } else if (value === 'AC') {
    setDisplay('');
  } else {
    setDisplay((prevDisplay) => {
      const lastChar = prevDisplay.slice(-1);
      const lastNumberSegment = prevDisplay.split(/[\+\-\*\/\%\^]/).pop();

      if (prevDisplay === '' && ['+', '*', '/', '%', '^'].includes(value)) {
        return prevDisplay;
      }

      if (operators.includes(lastChar) && operators.includes(value)) {
        if (!(lastChar === '^' && value === '-')) {
          return prevDisplay;
        }
      }

      if (value === '.' && lastNumberSegment.includes('.')) {
        return prevDisplay;
      }

      if (value === '.' && (prevDisplay === '' || operators.includes(lastChar))) {
        return prevDisplay + '0.';
      }

      if (value === 'x^2') return prevDisplay + '^2';
      if (value === 'x^y') return prevDisplay + '^';

      return prevDisplay + value;
    });
  }
};