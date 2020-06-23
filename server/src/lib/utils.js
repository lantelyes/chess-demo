const { BOARD, COORDINATE_MAP } = require('../constants');
const { isString } = require('util');

const getAvailableMoves = (coordinates) => {
  //Convert the input to numeric values for easier math
  const [x, y] = convertToNumericCoordinates(coordinates);

  const moves = [
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 2, y + 1],
    [x - 1, y - 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y - 2],
    [x + 2, y - 1],
  ];

  //Filter out invalid moves (ending up off board)
  const validMoves = moves.filter(
    ([x, y]) => x >= 0 && x <= BOARD.WIDTH && y >= 0 && y <= BOARD.HEIGHT,
  );

  return validMoves;
};

const convertToNumericCoordinates = (coordinates) => {
  const [column, row] = [...coordinates];

  return [COORDINATE_MAP[column], Number(row) - 1];
};

const convertToLetterCoordinates = (coordinates) => {
  const [column, row] = coordinates;
  return `${(column + 10).toString(36).toUpperCase()}${row + 1}`;
};

// Validate the chessboard coordinates
// Input: Coordinates string format (eg. C3)
const validateCordinates = (coordinates) => {
  //Get the upper bounds based on board size
  const columnUpperBound = String.fromCharCode(97 + BOARD.WIDTH).toUpperCase(); // Get the upper bound in letter format
  const rowUpperBound = BOARD.HEIGHT;

  const regex = new RegExp(`^[A-${columnUpperBound}][1-${rowUpperBound}]`);

  return (
    isString(coordinates) && coordinates.length === 2 && regex.test(coordinates)
  );
};

// Validate a move
// Input: Move in string format (eg. A1->C3)
const validateMove = (move) => {
  if (!move || !isString(move)) {
    return false;
  }

  const [to, from] = move.split('->');

  return validateCordinates(to) && validateCordinates(from);
};

module.exports = {
  getAvailableMoves,
  convertToNumericCoordinates,
  convertToLetterCoordinates,
  validateCordinates,
  validateMove,
};
