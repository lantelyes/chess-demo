import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import CreateSessionModal from '../components/CreateSessionModal';
import LoadSessionModal from '../components/LoadSessionModal';

const SessionContext = createContext();

const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [createSessionModalOpen, setCreateSessionModalOpen] = useState(false);
  const [loadSessionModalOpen, setLoadSessionModalOpen] = useState(false);

  const createSession = (name, onComplete = () => {}) => {
    const action = async () => {
      const response = await axios.post(`/api/sessions/create`, { name });

      setCurrentSession(response.data);
      onComplete();
    };
    action();
  };

  const loadSession = (id, onComplete = () => {}) => {
    const action = async () => {
      const response = await axios.get(`/api/sessions/${id}`);

      setCurrentSession(response.data);
      onComplete();
    };
    action();
  };

  const addMove = (move) => {
    const action = async () => {
      const response = await axios.post(
        `/api/sessions/${currentSession._id}/add-move`,
        { move },
      );
      setCurrentSession(response.data);
    };
    action();
  };

  useEffect(() => {
    const getSessions = async () => {
      const response = await axios.get(`/api/sessions`);
      setSessions(response.data);
    };

    getSessions();
  }, [currentSession]);

  return (
    <SessionContext.Provider
      value={{
        currentSession,
        sessions,
        createSession,
        loadSession,
        addMove,
        setCreateSessionModalOpen,
        setLoadSessionModalOpen,
      }}
    >
      <CreateSessionModal
        show={createSessionModalOpen}
        onClose={() => setCreateSessionModalOpen(false)}
      />
      <LoadSessionModal
        show={loadSessionModalOpen}
        onClose={() => setLoadSessionModalOpen(false)}
      />

      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.any,
};

export { SessionProvider, useSession };
