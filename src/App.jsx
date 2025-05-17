import React, { useState, useEffect } from 'react';
import ButtonContainer from './components/ButtonContainer';
import Answer from './components/Answer';
import Container from './components/Container';
import Instructions from './components/Instructions';
import MobileInput from './components/MobileInput.jsx'; // 
import { handleButtonClick } from './utils/handleButtonClick';
import { handleKeyPress } from './utils/handleKeyPress';

const App = () => {
  const [display, setDisplay] = useState('');
  const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

  const onButtonClick = (value) => {
    handleButtonClick(value, display, setDisplay);
  };

  useEffect(() => {
    if (!isMobileDevice) {
      const onKeyPress = (event) => handleKeyPress(event, display, setDisplay);
      window.addEventListener('keydown', onKeyPress);
      return () => window.removeEventListener('keydown', onKeyPress);
    }
  }, [display]);

  return (
    <>
      <Container>
        <Answer display={display} />

        {isMobileDevice && <MobileInput display={display} setDisplay={setDisplay} />}

        <ButtonContainer onButtonClick={onButtonClick} />
      </Container>
      <Instructions />
    </>
  );
};

export default App;
