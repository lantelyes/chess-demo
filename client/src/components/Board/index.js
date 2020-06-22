import React, { useEffect, useState } from 'react';

import BoardContainer from './BoardContainer';
import BoardRow from './BoardRow';
import BoardStartMessage from './BoardStartMessage';
import BoardSquare from './BoardSquare';

import { useSession } from '../../contexts/Session';

const ChessBoard = () => {
  const {
    currentSession,
    currentCoordinates,
    knightCoordinates,
  } = useSession();

  const [board, setBoard] = useState(null);

  //Generate a 2d array of squares to represent the board, and store it in the component state
  useEffect(() => {
    const board = [];

    for (let i = 7; i >= 0; i--) {
      const row = [];

      for (let j = 0; j < 8; j++) {
        const coordinates = [i, j];

        row.push(
          <BoardSquare
            key={`square-${i}-${j}`}
            coordinates={coordinates}
          ></BoardSquare>,
        );
      }

      board.push(<BoardRow key={`row-${i}`}>{row}</BoardRow>);
    }

    setBoard(board);
  }, [knightCoordinates, currentCoordinates]);

  return (
    <BoardContainer id="board">
      {currentSession ? (
        board
      ) : (
        <BoardStartMessage>
          Create, or Load a Session to Start
        </BoardStartMessage>
      )}
    </BoardContainer>
  );
};

export default ChessBoard;
