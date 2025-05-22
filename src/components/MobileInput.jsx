import React, { useRef, useEffect } from 'react';

const MobileInput = ({ display, setDisplay }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setDisplay(e.target.value);
  };

  const insertAtCursor = (value) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const newValue = display.slice(0, start) + value + display.slice(end);
    setDisplay(newValue);

    setTimeout(() => {
      input.setSelectionRange(start + value.length, start + value.length);
      input.focus();
    }, 0);
  };

  const deleteAtCursor = () => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (start === 0) return;

    const newValue = display.slice(0, start - 1) + display.slice(end);
    setDisplay(newValue);

    setTimeout(() => {
      input.setSelectionRange(start - 1, start - 1);
      input.focus();
    }, 0);
  };

  window.__mobileInputControl = {
    insertAtCursor,
    deleteAtCursor,
    inputRef,
  };

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

export default MobileInput;
