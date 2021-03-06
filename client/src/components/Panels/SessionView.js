import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSession } from '../../contexts/Session';

const SessionViewContainer = styled.div`
  width: 300px;
  @media (max-width: 800px) {
    width: 400px;
  }

  @media (max-width: 400px) {
    width: 308px;
    height: 250px;
  }
`;

const SessionNotFounndMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SessionView = () => {
  const { currentSession } = useSession();

  //Display moves with most recent first
  const moves = get(currentSession, 'moves', []);

  return (
    <SessionViewContainer>
      <Card
        id="session-view"
        style={{ width: '100%', height: '100%', maxHeight: 400 }}
      >
        <Card.Header as="h5">
          {currentSession ? `Session: ${currentSession.name}` : 'Session'}
        </Card.Header>
        <Card.Body style={{ overflow: 'scroll' }}>
          {currentSession ? (
            <ListGroup className="list-group-flush">
              {moves.map((move, i) => (
                <ListGroupItem key={`session-${i + 1}`}>{`${
                  i + 1
                }: ${move}`}</ListGroupItem>
              ))}
            </ListGroup>
          ) : (
            <SessionNotFounndMessage>
              Load, or Create a Session
            </SessionNotFounndMessage>
          )}
        </Card.Body>
      </Card>
    </SessionViewContainer>
  );
};

export default SessionView;
