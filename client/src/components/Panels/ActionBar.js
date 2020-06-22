import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { useSession } from '../../contexts/Session';

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ActionBar = () => {
  const { setCreateSessionModalOpen, setLoadSessionModalOpen } = useSession();

  return (
    <Card id="action-bar" style={{ width: 740 }}>
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
  );
};

export default ActionBar;
