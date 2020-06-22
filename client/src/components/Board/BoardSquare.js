import React from 'react';
import PropTypes from 'prop-types';
import { isValidMove, serializeMove } from '../../utils';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { useSession } from '../../contexts/Session';

const getSquareContents = (containsKnight, isPrimaryMove, isSecondaryMove) => {
  if (containsKnight) {
    return 'K';
  } else if (isPrimaryMove) {
    return '1';
  } else if (isSecondaryMove) {
    return '2';
  } else {
    return '';
  }
};

const getSquareColor = (props) => {
  const { isDark, isPrimaryMove, isSelected, isSecondaryMove } = props;

  if (isSecondaryMove) {
    return '#2e2e2e';
  }

  if (isPrimaryMove || isSelected) {
    return '#000000';
  }

  return isDark ? '#b8b6b6' : 'none';
};

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 900;
  color: ${(props) =>
    (props.containsKnight && props.isSelected) ||
    props.isPrimaryMove ||
    props.isSecondaryMove
      ? 'white'
      : 'black'};
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: ${(props) => getSquareColor(props)};
  border: ${(props) =>
      props.isPrimaryMove || props.isSecondaryMove ? '4px' : '2px'}
    solid black;
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
    availableSecondaryMoves,
  } = useSession();

  const isSelected = isEqual(selectedCoordinates, coordinates);
  const containsKnight = isEqual(coordinates, knightCoordinates);
  const isKnightSelected = isEqual(selectedCoordinates, knightCoordinates);
  const isPrimaryMove = isValidMove(coordinates, availableMoves);
  const isSecondaryMove = isValidMove(coordinates, availableSecondaryMoves);

  const isDark =
    (column % 2 === 0 && row % 2 === 0) || (column % 2 === 1 && row % 2 === 1); // Style the board squares based on position

  return (
    <Square
      isSelected={isSelected}
      isDark={isDark}
      isPrimaryMove={isPrimaryMove}
      isSecondaryMove={isSecondaryMove}
      containsKnight={containsKnight}
      onClick={() => {
        if (isFirstMove) {
          setIsFirstMove(false);
          setKnightCoordinnates(coordinates);
        } else {
          if (isKnightSelected && isPrimaryMove) {
            addMove(serializeMove(knightCoordinates, coordinates));
            setKnightCoordinnates(coordinates);
          }
        }
        setSelectedCoordinates(coordinates);
      }}
    >
      {getSquareContents(containsKnight, isPrimaryMove, isSecondaryMove)}
    </Square>
  );
};

BoardSquare.propTypes = {
  coordinates: PropTypes.array,
};

export default BoardSquare;
