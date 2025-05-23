import React, { useState, useRef, useEffect } from 'react';
import UnifiedInput from './components/UnifiedInput';
import ButtonContainer from './components/ButtonContainer';
import Container from './components/Container';
import Instructions from './components/Instructions';
import { handleButtonClick } from './utils/handleButtonClick';
import { handleKeyPress } from './utils/handleKeyPress';

const App = () => {
  const [display, setDisplay] = useState('');
  const [wasEvaluated, setWasEvaluated] = useState(false);
  const inputRef = useRef(null);
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  const onButtonClick = (value) => {
    handleButtonClick(value, display, setDisplay, wasEvaluated, setWasEvaluated);
  };

  useEffect(() => {
    if (!isMobileDevice) {
      const onKeyPress = (event) => {
        handleKeyPress(event, display, setDisplay, inputRef, wasEvaluated, setWasEvaluated);
      };
      window.addEventListener('keydown', onKeyPress);
      return () => window.removeEventListener('keydown', onKeyPress);
    }
  }, [display, isMobileDevice, wasEvaluated]);

  return (
    <>
      <Container>
        <UnifiedInput display={display} setDisplay={setDisplay} wasEvaluated={wasEvaluated} setWasEvaluated={setWasEvaluated} inputRef={inputRef} />
        <ButtonContainer onButtonClick={onButtonClick} />
      </Container>
      <Instructions />
    </>
  );
};

export default App;
