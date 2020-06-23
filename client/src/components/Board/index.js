import React, { useEffect, useState } from 'react';

import BoardContainer from './BoardContainer';
import BoardRow from './BoardRow';
import BoardStartMessage from './BoardStartMessage';
import BoardSquare from './BoardSquare';

import { useSession } from '../../contexts/Session';
import { BOARD } from '../../constants';

const ChessBoard = () => {
  const {
    currentSession,
    currentCoordinates,
    knightCoordinates,
  } = useSession();

  const [board, setBoard] = useState(null);

  //Generate a 2D array of squares to represent the board, and store it in the component state
  useEffect(() => {
    const board = [];

    for (let i = BOARD.HEIGHT - 1; i >= 0; i--) {
      const row = [];

      for (let j = 0; j < BOARD.WIDTH; j++) {
        const coordinates = [i, j];

        row.push(
          <BoardSquare key={`square-${i}-${j}`} coordinates={coordinates} />,
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
