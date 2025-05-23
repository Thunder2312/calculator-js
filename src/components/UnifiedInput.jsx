import React, { useEffect } from 'react';
import { handleKeyPress } from '../utils/handleKeyPress';

const UnifiedInput = ({ display, setDisplay, wasEvaluated, setWasEvaluated, inputRef }) => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (inputRef.current && !isMobileDevice) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isMobileDevice) {
      const onKeyPress = (event) =>
        handleKeyPress(event, display, setDisplay, inputRef, wasEvaluated, setWasEvaluated);

      window.addEventListener('keydown', onKeyPress);
      return () => window.removeEventListener('keydown', onKeyPress);
    }
  }, [display, isMobileDevice, wasEvaluated]);

  const handleChange = (e) => {
    setDisplay(e.target.value);
    setWasEvaluated(false);
  };

  const insertAtCursor = (value) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    let newValue = display;

    if (wasEvaluated) {
      newValue = value;
    } else {
      newValue = display.slice(0, start) + value + display.slice(end);
    }

    setDisplay(newValue);

    requestAnimationFrame(() => {
      const pos = wasEvaluated ? value.length : start + value.length;
      input.setSelectionRange(pos, pos);
    });

    setWasEvaluated(false);
  };

  const deleteAtCursor = () => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start === 0 && end === 0) return;

    const newValue = display.slice(0, start - 1) + display.slice(end);
    setDisplay(newValue);

    requestAnimationFrame(() => {
      const newPos = start - 1;
      input.setSelectionRange(newPos, newPos);
    });

    setWasEvaluated(false);
  };

  useEffect(() => {
    window.__mobileInputControl = {
      insertAtCursor,
      deleteAtCursor,
      inputRef,
    };
  }, [display, wasEvaluated]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={display}
      onChange={handleChange}
      onKeyDown={(event) =>
        handleKeyPress(event, display, setDisplay, inputRef, wasEvaluated, setWasEvaluated)
      }
      style={{ fontSize: '24px', width: '100%', padding: '10px' }}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
    />
  );
};

export default UnifiedInput;
