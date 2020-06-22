import React from 'react';
import PropTypes from 'prop-types';
import './theme/bootstrap.min.css';

import { SessionProvider } from './contexts/Session';

import ChessBoard from './components/Board/index';
import ActionBar from './components/Panels/ActionBar';

import styled from 'styled-components';
import SessionView from './components/Panels/SessionView';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 740px;
  margin-top: 40px;
`;

const Providers = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

Providers.propTypes = {
  children: PropTypes.any,
};

const App = () => (
  <Providers>
    <MainContainer>
      <ActionBar></ActionBar>
      <BoardContainer>
        <ChessBoard />
        <SessionView />
      </BoardContainer>
    </MainContainer>
  </Providers>
);

export default App;
