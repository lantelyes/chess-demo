import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Modal, Button, Table } from 'react-bootstrap';
import { useSession } from '../../contexts/Session';

const NoSessionsFoundMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const SessionsTableContainer = styled.div`
  max-height: 400px;
  overflow: scroll;
`;

const HideTdOnMobile = styled.td`
  @media (max-width: 400px) {
    display: none;
  }
`;

const HideThOnMobile = styled.th`
  @media (max-width: 400px) {
    display: none;
  }
`;

const LoadSessionModal = ({ show, onClose }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const { loadSession, sessions } = useSession();

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Load Session</Modal.Title>
      </Modal.Header>
      <SessionsTableContainer>
        {!isEmpty(sessions) ? (
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <HideThOnMobile>Moves</HideThOnMobile>
                <th>Last Move</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, i) => (
                <tr
                  key={`load-session-${i + 1}`}
                  onClick={() => setSelectedSessionId(session._id)}
                  style={{
                    backgroundColor:
                      selectedSessionId === session._id ? '#c9c9c9' : 'unset',
                  }}
                >
                  <td>{session.name}</td>
                  <HideTdOnMobile>{session.moves.length}</HideTdOnMobile>
                  <td>
                    {session.moves.length
                      ? session.moves[session.moves.length - 1]
                      : 'None'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoSessionsFoundMessage>No Sessions Found</NoSessionsFoundMessage>
        )}
      </SessionsTableContainer>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={async () => {
            await loadSession(selectedSessionId);
            onClose();
          }}
          disabled={!selectedSessionId}
        >
          Load
        </Button>
        <Button variant="primary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LoadSessionModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LoadSessionModal;
