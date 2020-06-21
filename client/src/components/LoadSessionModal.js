import React, { useState } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Modal, Button, Table } from 'react-bootstrap';
import { useSession } from '../contexts/Session';

const LoadSessionModal = ({ show, onClose }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const { loadSession, sessions } = useSession();

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Load Session</Modal.Title>
      </Modal.Header>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Last Updated</th>
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
              <td>{moment(session.createdAt).format('MM/DD h:mma')}</td>
              <td>{moment(session.updatedAt).format('MM/DD h:mma')}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => loadSession(selectedSessionId, onClose)}
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
