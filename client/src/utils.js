import { isEqual } from 'lodash';
import { COORDINATE_MAP } from './constants';

export const convertToNumericCoordinates = (coordinates) => {
  const [row, column] = coordinates.split('');

  return [Number(column) - 1, COORDINATE_MAP[row]];
};

export const getLatestPostionFromMoves = (moves) => {
  const lastMove = moves.slice(-1)[0];

  if (lastMove) {
    const lastPostion = lastMove.split('->')[1];

    return convertToNumericCoordinates(lastPostion);
  } else {
    return false;
  }
};

export const isValidMove = (move, availableMoves) => {
  for (let availableMove of availableMoves) {
    if (isEqual(availableMove, move)) {
      return true;
    }
  }

  return false;
};

export const converttoLetterCoordinates = (row, column) =>
  `${(column + 10).toString(36).toUpperCase()}${row + 1}`;

export const serializeMove = (from, to) =>
  `${(from[1] + 10).toString(36).toUpperCase()}${from[0] + 1}->${(to[1] + 10)
    .toString(36)
    .toUpperCase()}${to[0] + 1}`;
