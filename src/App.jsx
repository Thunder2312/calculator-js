import React, { useState, useEffect, useRef } from 'react';
import ButtonContainer from './components/ButtonContainer';
import Answer from './components/Answer';
import Container from './components/Container';
import Instructions from './components/Instructions';
import { handleButtonClick } from './utils/handleButtonClick';
import { handleKeyPress } from './utils/handleKeyPress';

const App = () => {
  const [display, setDisplay] = useState('');
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  // Create a ref for the input element
  const inputRef = useRef(null);

  const onButtonClick = (value) => {
    handleButtonClick(value, display, setDisplay);
  };

  useEffect(() => {
    if (!isMobileDevice) {
      const onKeyPress = (event) => handleKeyPress(event, display, setDisplay, inputRef);
      window.addEventListener('keydown', onKeyPress);
      return () => window.removeEventListener('keydown', onKeyPress);
    }
  }, [display, isMobileDevice]);

  return (
    <>
      <Container>
        <Answer display={display} inputRef={inputRef} />
        <ButtonContainer onButtonClick={onButtonClick} />
      </Container>
      <Instructions />
    </>
  );
};

export default App;
