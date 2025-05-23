import { evaluate } from 'mathjs';

export const handleButtonClick = (value, display, setDisplay, wasEvaluated, setWasEvaluated) => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
  const operators = ['+', '-', '*', '/', '%', '^'];

  if (value === '=') {
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
      setWasEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setWasEvaluated(true);
    }
    return;
  }

  if (value === 'AC') {
    setDisplay('');
    setWasEvaluated(false);
    return;
  }

  if (value === '<-') {
    if (isMobileDevice && window.__mobileInputControl) {
      window.__mobileInputControl.deleteAtCursor();
    } else {
      setDisplay((prev) => prev.slice(0, -1));
    }
    setWasEvaluated(false);
    return;
  }

  if (isMobileDevice && window.__mobileInputControl) {
    window.__mobileInputControl.insertAtCursor(value);
    setWasEvaluated(false);
    return;
  }

  // If last action was evaluation, clear display before adding new input
  if (wasEvaluated) {
    setDisplay(value);
    setWasEvaluated(false);
    return;
  }

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

    if (value === 'x^2') {
      return prevDisplay + '^2';
    }

    return prevDisplay + value;
  });

  setWasEvaluated(false);
};
