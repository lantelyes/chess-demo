import React from 'react';
import Joyride from 'react-joyride';
import './theme/bootstrap.min.css';
import './theme/custom.css';

import { SessionProvider } from './contexts/Session';

import ChessBoard from './components/Board/index';
import ActionBar from './components/Panels/ActionBar';

import styled from 'styled-components';
import SessionView from './components/Panels/SessionView';

import { TUTORIAL_STEPS } from './constants';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 740px;
  margin-top: 40px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const App = () => (
  <SessionProvider>
    <Joyride
      steps={TUTORIAL_STEPS}
      continuous
      styles={{
        options: {
          primaryColor: 'black',
          width: 300,
        },
      }}
    />
    <MainContainer>
      <ActionBar></ActionBar>
      <BoardContainer>
        <ChessBoard />
        <SessionView />
      </BoardContainer>
    </MainContainer>
  </SessionProvider>
);

export default App;
