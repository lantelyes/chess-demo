import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import axios from 'axios';
import styled from 'styled-components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoardSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.hilighted ? 'grey' : props.dark ? '#b8b6b6' : 'none'};
  border: ${(props) => (props.hilighted ? '3px' : '1px')} solid black;
`;

const containsMove = (possibleMove, availableMoves) => {
  for (let move of availableMoves) {
    if (isEqual(move, possibleMove)) {
      return true;
    }
  }

  return false;
};

const ChessBoard = () => {
  const [board, setBoard] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [knightCoordinates, setKnightCoordinnates] = useState([7, 0]);
  const [availableMoves, setAvailableMoves] = useState([]);

  useEffect(() => {
    const [column, row] = knightCoordinates;

    const letterFormat = `${(column + 10).toString(36).toUpperCase()}${
      row + 1
    }`;

    const getMoves = async () => {
      const moves = await axios.get(`/api/moves/${letterFormat}`);

      setAvailableMoves(moves.data);
    };

    getMoves();
  }, [knightCoordinates]);

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
          containsMove(currentCoordinates, availableMoves) && isKnightSelected;
        const isDark =
          (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1); // Style the board squares based on position

        row.push(
          <BoardSquare
            dark={isDark}
            hilighted={isSelected || canMoveTo}
            onClick={() => {
              if (isKnightSelected && canMoveTo) {
                setKnightCoordinnates(currentCoordinates);
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
  }, [selectedCoordinates, knightCoordinates, availableMoves]);

  return <BoardContainer>{board}</BoardContainer>;
};

export default ChessBoard;
