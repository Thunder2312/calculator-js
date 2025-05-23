import React, { useRef, useEffect } from 'react';
import { handleKeyPress } from '../utils/handleKeyPress';

const UnifiedInput = ({ display, setDisplay, wasEvaluated, setWasEvaluated, inputRef }) => {
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (inputRef.current) {
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

    const newValue = display.slice(0, start) + value + display.slice(end);
    setDisplay(newValue);

    requestAnimationFrame(() => {
      input.setSelectionRange(start + value.length, start + value.length);
      if (document.activeElement !== input) input.focus();
    });

    setWasEvaluated(false);
  };

  const deleteAtCursor = () => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start === 0) return;

    const newValue = display.slice(0, start - 1) + display.slice(end);
    setDisplay(newValue);

    requestAnimationFrame(() => {
      input.setSelectionRange(start - 1, start - 1);
      if (document.activeElement !== input) input.focus();
    });

    setWasEvaluated(false);
  };

  useEffect(() => {
    window.__mobileInputControl = {
      insertAtCursor,
      deleteAtCursor,
      inputRef,
    };
  }, [display]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={display}
      onChange={handleChange}
      style={{ fontSize: '24px', width: '100%', padding: '10px' }}
    />
  );
};

export default UnifiedInput;
