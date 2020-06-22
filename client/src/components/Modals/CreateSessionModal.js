import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Form } from 'react-bootstrap';
import { useSession } from '../../contexts/Session';

const CreateSessionModal = ({ show, onClose }) => {
  const [name, setName] = useState('');

  const { createSession } = useSession();

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Session</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="session-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="New Session Name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => createSession(name, onClose)}
          disabled={!name}
        >
          Create
        </Button>
        <Button variant="primary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CreateSessionModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateSessionModal;
