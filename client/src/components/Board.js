import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import axios from 'axios';
import styled from 'styled-components';
import { isValidMove, serializeMove } from '../utils';
import { useSession } from '../contexts/Session';

const BoardStartMessage = styled.div`
  width: 400px;
  height: 400px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  text-align: center;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 2px solid black;
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoardSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 900;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.hilighted ? 'grey' : props.dark ? '#b8b6b6' : 'none'};
  border: ${(props) => (props.hilighted ? '4px' : '2px')} solid black;
`;

const ChessBoard = () => {
  const {
    currentSession,
    addMove,
    knightCoordinates,
    setKnightCoordinnates,
    selectedCoordinates,
    setSelectedCoordinates,
  } = useSession();

  const [isFirstMove, setIsFirstMove] = useState(true);
  const [board, setBoard] = useState(null);
  const [availableMoves, setAvailableMoves] = useState([]);

  useEffect(() => {
    const getMoves = async () => {
      const [column, row] = knightCoordinates;

      const letterFormat = `${(column + 10).toString(36).toUpperCase()}${
        row + 1
      }`;

      const moves = await axios.get(`/api/moves/${letterFormat}`);

      setAvailableMoves(moves.data);
    };
    if (!isFirstMove) {
      getMoves();
    }
  }, [knightCoordinates, isFirstMove]);

  //Generate a 2d array of squares to represent the board, and store it in the component state
  useEffect(() => {
    const board = [];

    for (let i = 7; i >= 0; i--) {
      const row = [];

      for (let j = 0; j < 8; j++) {
        //Helper Variables
        const currentCoordinates = [i, j];
        const isSelected = isEqual(selectedCoordinates, currentCoordinates);
        const containsKnight = isEqual(currentCoordinates, knightCoordinates);
        const isKnightSelected = isEqual(
          selectedCoordinates,
          knightCoordinates,
        );
        const canMoveTo =
          isValidMove(currentCoordinates, availableMoves) && isKnightSelected;
        const isDark =
          (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1); // Style the board squares based on position

        row.push(
          <BoardSquare
            dark={isDark}
            hilighted={isSelected || canMoveTo}
            onClick={() => {
              if (isFirstMove) {
                setIsFirstMove(false);
                setKnightCoordinnates(currentCoordinates);
              } else {
                if (isKnightSelected && canMoveTo) {
                  addMove(serializeMove(knightCoordinates, currentCoordinates));
                  setKnightCoordinnates(currentCoordinates);
                }
              }
              setSelectedCoordinates(currentCoordinates);
            }}
          >
            {containsKnight ? 'K' : null}
          </BoardSquare>,
        );
      }

      board.push(<BoardRow>{row}</BoardRow>);
    }

    setBoard(board);
  }, [selectedCoordinates, knightCoordinates, availableMoves, addMove]);

  return (
    <BoardContainer>
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
