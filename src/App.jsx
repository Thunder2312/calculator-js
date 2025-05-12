import React, { useState, useEffect } from 'react';
import ButtonContainer from './components/ButtonContainer';
import Answer from './components/Answer';
import Container from './components/Container';
import { handleButtonClick } from './utils/handleButtonClick';
import { handleKeyPress } from './utils/handleKeyPress';

const App = () => {
  const [display, setDisplay] = useState('');

  const onButtonClick = (value) => {
    handleButtonClick(value, display, setDisplay);
  };

  useEffect(() => {
    const onKeyPress = (event) => handleKeyPress(event, display, setDisplay);

    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [display]);

  return (
    <Container>
      <Answer display={display} />
      <ButtonContainer onButtonClick={onButtonClick} />
    </Container>
  );
};

export default App;
