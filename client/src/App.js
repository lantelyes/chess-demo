import React from 'react';

import ChessBoard from './components/Board';
import SessionBrowser from './components/SessionBrowser';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

const App = () => (
  <Container>
    <ChessBoard />
  </Container>
);

export default App;
