import { evaluate } from 'mathjs';

export const handleKeyPress = (event, display, setDisplay, inputRef, wasEvaluated, setWasEvaluated) => {
  const key = event.key;
  const operators = ['+', '-', '*', '/', '%', '^'];

  const input = inputRef.current;
  if (!input || !(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) {
    return; 
  }

  const start = input.selectionStart;
  const end = input.selectionEnd;

  const lastChar = display.slice(-1);
  const lastNumberSegment = display.split(/[\+\-\*\/\%\^]/).pop();

  if (key === 'Enter') {
    event.preventDefault();

    const sanitizedDisplay = display.trim();
    if (!sanitizedDisplay) {
      setDisplay('Error');
      setWasEvaluated(true);
      return;
    }

    try {
      const result = evaluate(sanitizedDisplay);
      setDisplay(result.toString());
      setWasEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setWasEvaluated(true);
    }
    return;
  }

  if (key === 'Backspace') {
    if (start === 0) return; 

    const newValue = display.slice(0, start - 1) + display.slice(end);
    setDisplay(newValue);

    requestAnimationFrame(() => {
      input.setSelectionRange(start - 1, start - 1);
      input.focus();
    });

    setWasEvaluated(false);
    return;
  }

  if (key === 'Delete') {
    if (start === end) return;

    const newValue = display.slice(0, start) + display.slice(end);
    setDisplay(newValue);

    requestAnimationFrame(() => {
      input.setSelectionRange(start, start);
      input.focus();
    });

    setWasEvaluated(false);
    return;
  }

  if (/\d/.test(key) || operators.includes(key) || ['.', '=', '+', '-', '*', '/', '%', '^'].includes(key)) {
    event.preventDefault();

    // If last action was evaluation, clear display before adding new input
    if (wasEvaluated) {
      setDisplay(key);
      setWasEvaluated(false);
      return;
    }

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

    const newValue = display.slice(0, start) + key + display.slice(end);
    setDisplay(newValue);

    requestAnimationFrame(() => {
      input.setSelectionRange(start + key.length, start + key.length);
      input.focus();
    });

    setWasEvaluated(false);
  }
};
