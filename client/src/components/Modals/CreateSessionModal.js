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

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createSession(name, onClose);
        }}
      >
        <Modal.Body>
          <Form.Group controlId="session-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="New Session Name"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" type="submit" disabled={!name}>
            Create
          </Button>
          <Button variant="primary" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

CreateSessionModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateSessionModal;
