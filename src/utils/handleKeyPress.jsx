import { evaluate } from 'mathjs';

export const handleKeyPress = (event, display, setDisplay, inputRef) => {
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
      return;
    }

    try {
      const result = evaluate(sanitizedDisplay);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
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
    return;
  }

 
  if (key === 'Delete') {
    if (start === end) return; // If there's no selection, we don't delete

    const newValue = display.slice(0, start) + display.slice(end);
    setDisplay(newValue);

    // Update cursor position after delete
    requestAnimationFrame(() => {
      input.setSelectionRange(start, start);
      input.focus();
    });
    return;
  }

  // Handle normal key presses (digits, operators, etc.)
  if (/\d/.test(key) || operators.includes(key) || ['.', '=', '+', '-', '*', '/', '%', '^'].includes(key)) {
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

    // Insert key at cursor position
    const newValue = display.slice(0, start) + key + display.slice(end);
    setDisplay(newValue);

    // Update cursor position after insert
    requestAnimationFrame(() => {
      input.setSelectionRange(start + key.length, start + key.length);
      input.focus();
    });
  }
};
