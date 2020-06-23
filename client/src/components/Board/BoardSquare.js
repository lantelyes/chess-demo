import React from 'react';
import PropTypes from 'prop-types';
import { isValidMove, serializeMove } from '../../utils';
import { isEqual } from 'lodash';
import styled from 'styled-components';
import { useSession } from '../../contexts/Session';

const getSquareContents = (
  containsKnight,
  isPrimaryMove,
  isSecondaryMove,
  isKnightSelected,
) => {
  if (containsKnight) {
    return 'K';
  }

  if (isKnightSelected) {
    if (isPrimaryMove) {
      return '1';
    }
    if (isSecondaryMove) {
      return '2';
    }
  }

  return '';
};

const getSquareColor = (props) => {
  const {
    isDark,
    isPrimaryMove,
    isSelected,
    isSecondaryMove,
    isKnightSelected,
  } = props;

  if (isKnightSelected) {
    if (isSecondaryMove && !isSelected) {
      return '#696969';
    }

    if (isPrimaryMove) {
      return '#000000';
    }
  }
  if (isSelected) {
    return '#000000';
  } else {
    return isDark ? '#b8b6b6' : 'none';
  }
};

const getSquareBorderWidth = (props) => {
  const {
    containsKnight,
    isPrimaryMove,
    isSelected,
    isSecondaryMove,
    isKnightSelected,
  } = props;
  if (isKnightSelected) {
    if (isPrimaryMove || isSecondaryMove || containsKnight) {
      return '4px';
    }
  }

  if (isSelected) {
    return '4px';
  } else {
    return '2px';
  }
};

const getSquareFontColor = (props) => {
  const { isPrimaryMove, isSecondaryMove, isKnightSelected } = props;

  if (props.containsKnight && props.isSelected) {
    return '#ffffff';
  }

  if (isKnightSelected && (isPrimaryMove || isSecondaryMove)) {
    return '#ffffff';
  }

  return '#000000';
};

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 900;
  color: ${(props) => getSquareFontColor(props)};
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: ${(props) => getSquareColor(props)};
  border: ${(props) => getSquareBorderWidth(props)} solid black;

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
      isKnightSelected={isKnightSelected}
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
      {getSquareContents(
        containsKnight,
        isPrimaryMove,
        isSecondaryMove,
        isKnightSelected,
      )}
    </Square>
  );
};

BoardSquare.propTypes = {
  coordinates: PropTypes.array,
};

export default BoardSquare;
