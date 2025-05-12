import { evaluate } from 'mathjs';

export const handleKeyPress = (event, display, setDisplay) => {
  const key = event.key;
  const operators = ['+', '-', '*', '/', '%', '^'];
  const lastChar = display.slice(-1);
  const lastNumberSegment = display.split(/[\+\-\*\/\%\^]/).pop();

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

  if (/\d/.test(key) || operators.includes(key) || ['.', '=', 'Backspace', 'Delete'].includes(key)) {
    if (operators.includes(lastChar) && operators.includes(key)) {
      if (!(lastChar === '^' && key === '-')) {
        return;
      }
    }

    if (key === '.' && lastNumberSegment.includes('.')) {
      return;
    }

    if (key === '.' && (display === '' || operators.includes(lastChar))) {
      setDisplay(display + '0.');
      return;
    }

    if (key === 'Backspace') {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (key === 'Delete') {
      setDisplay('');
    } else {
      setDisplay((prev) => prev + key);
    }
  }
};
