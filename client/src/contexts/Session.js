import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import CreateSessionModal from '../components/Modals/CreateSessionModal';
import LoadSessionModal from '../components/Modals/LoadSessionModal';
import {
  getLatestPostionFromMoves,
  convertToLetterCoordinates,
} from '../utils';

const SessionContext = createContext();

const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  //Global session state
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);

  //Board states
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(false);
  const [knightCoordinates, setKnightCoordinnates] = useState(false);

  // Modal states
  const [createSessionModalOpen, setCreateSessionModalOpen] = useState(false);
  const [loadSessionModalOpen, setLoadSessionModalOpen] = useState(false);

  //Create a new session with a given name
  // Sets the current session in the application state to the new session
  const createSession = (name, onComplete = () => {}) => {
    const action = async () => {
      const response = await axios.post(`/api/sessions/create`, { name });

      setCurrentSession(response.data);
      setSelectedCoordinates(false);
      setKnightCoordinnates(false);
      onComplete();
    };
    action();
  };

  //Load a stored session from the database
  // Sets the loaded session in the application state to returned session
  const loadSession = (id, onComplete = () => {}) => {
    const action = async () => {
      const response = await axios.get(`/api/sessions/${id}`);

      setCurrentSession(response.data);
      const lastPosition = getLatestPostionFromMoves(response.data.moves);

      if (lastPosition) {
        setKnightCoordinnates(lastPosition);
        setIsFirstMove(false);
      }

      onComplete();
    };
    action();
  };

  // Adds a move to the current session, input must be in algebraic notation (eg. C2->D4)
  const addMove = (move, onComplete = () => {}) => {
    const action = async () => {
      const response = await axios.post(
        `/api/sessions/${currentSession._id}/add-move`,
        { move },
      );
      setCurrentSession(response.data);
      onComplete();
    };
    action();
  };

  //Get available moves whenever the knight's position on the board changes and store them in the application state
  useEffect(() => {
    const getMoves = async () => {
      const [column, row] = knightCoordinates;

      const letterFormat = convertToLetterCoordinates(column, row);

      const moves = await axios.get(`/api/moves/${letterFormat}`);

      setAvailableMoves(moves.data);
    };

    if (!isFirstMove && knightCoordinates) {
      getMoves();
    }
  }, [knightCoordinates, isFirstMove]);

  //Load the stored sessions into the application state
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
        //Session state
        currentSession,
        sessions,
        isFirstMove,
        setIsFirstMove,

        //Session API
        createSession,
        loadSession,
        addMove,

        //Modals
        setCreateSessionModalOpen,
        setLoadSessionModalOpen,

        //Board state
        availableMoves,
        selectedCoordinates,
        knightCoordinates,
        setKnightCoordinnates,
        setSelectedCoordinates,
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
