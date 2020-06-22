import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { useSession } from '../../contexts/Session';

const ActionsCardContainer = styled.div`
  justify-content: space-between;
  width: 740px;

  @media (max-width: 800px) {
    width: 400px;
  }

  @media (max-width: 400px) {
    width: 308px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 118px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 400px) {
      width: 250px;
    }
  }
`;

const ActionBar = () => {
  const { setCreateSessionModalOpen, setLoadSessionModalOpen } = useSession();

  return (
    <ActionsCardContainer>
      <Card id="action-bar" style={{ width: '100%' }}>
        <Card.Header as="h4">Chess Board Demo</Card.Header>
        <Card.Body>
          <ActionsContainer>
            <Button
              variant="primary"
              onClick={() => setCreateSessionModalOpen(true)}
            >
              Start New Session
            </Button>
            <Button
              variant="primary"
              onClick={() => setLoadSessionModalOpen(true)}
            >
              Load Previous Session
            </Button>
          </ActionsContainer>
        </Card.Body>
      </Card>
    </ActionsCardContainer>
  );
};

export default ActionBar;
