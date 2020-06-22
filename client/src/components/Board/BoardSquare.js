import React from 'react';
import PropTypes from 'prop-types';
import { isValidMove, serializeMove } from '../../utils';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { useSession } from '../../contexts/Session';

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 900;
  color: ${(props) => (props.hilighted ? 'white' : 'black')};
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.hilighted ? 'grey' : props.dark ? '#b8b6b6' : 'none'};
  border: ${(props) => (props.hilighted ? '4px' : '2px')} solid black;

  @media (max-width: 400px) {
    width: 38px;
    height: 38px;
    font-size: 28px;
  }
`;

const BoardSquare = ({ coordinates }) => {
  const [column, row] = coordinates;

  const {
    addMove,
    selectedCoordinates,
    knightCoordinates,
    isFirstMove,
    availableMoves,
    setIsFirstMove,
    setKnightCoordinnates,
    setSelectedCoordinates,
  } = useSession();

  const isSelected = isEqual(selectedCoordinates, coordinates);
  const containsKnight = isEqual(coordinates, knightCoordinates);
  const isKnightSelected = isEqual(selectedCoordinates, knightCoordinates);
  const canMoveTo =
    isValidMove(coordinates, availableMoves) && isKnightSelected;
  const isDark =
    (column % 2 === 0 && row % 2 === 0) || (column % 2 === 1 && row % 2 === 1); // Style the board squares based on position

  return (
    <Square
      dark={isDark}
      containsKnight={containsKnight}
      hilighted={isSelected || canMoveTo}
      onClick={() => {
        if (isFirstMove) {
          setIsFirstMove(false);
          setKnightCoordinnates(coordinates);
        } else {
          if (isKnightSelected && canMoveTo) {
            addMove(serializeMove(knightCoordinates, coordinates));
            setKnightCoordinnates(coordinates);
          }
        }
        setSelectedCoordinates(coordinates);
      }}
    >
      {containsKnight ? 'K' : null}
    </Square>
  );
};

BoardSquare.propTypes = {
  coordinates: PropTypes.array,
};

export default BoardSquare;
