import React from 'react';
import { styled } from 'linaria/react';

const Background = ({ children }) => {
  const onMove = () => console.log(`moved!`);
  return <BackgroundDiv onMouseMove={onMove}>{children}</BackgroundDiv>
}

const BackgroundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  border: 2px dashed red;
  box-sizing: border-box;
`;

export { Background };