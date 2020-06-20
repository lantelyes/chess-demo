const { BOARD, COORDINATE_MAP } = require('../constants');
const { isString } = require('util');

const getAvailableMoves = (coordinates) => {
  //Convert the input to numeric values for easier math
  const [x, y] = convertToNumericCoordinates(coordinates);

  const moves = [
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x + 2, y + 1],
    [x - 2, y - 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y - 2],
    [x + 2, y - 1],
  ];

  //Filter out invalid moves (ending up off board)
  const validMoves = moves.filter(
    (move) =>
      move[0] >= 0 &&
      move[0] <= BOARD.WIDTH &&
      move[1] >= 0 &&
      move[1] <= BOARD.HEIGHT,
  );

  return validMoves;
};

const convertToNumericCoordinates = (coordinates) => {
  const [row, column] = coordinates.split('');

  return [COORDINATE_MAP[row], Number(column) - 1];
};

// Validate the chessboard coordinates
// Input: Coordinates string format
const validateCordinates = (coordinates) => {
  //Get the upper bounds based on board size
  const columnUpperBound = String.fromCharCode(97 + BOARD.WIDTH).toUpperCase(); // Get the upper bound in letter format
  const rowUpperBound = BOARD.HEIGHT;

  const regex = new RegExp(`^[A-${columnUpperBound}][1-${rowUpperBound}]`);

  return (
    isString(coordinates) && coordinates.length === 2 && regex.test(coordinates)
  );
};

module.exports = {
  getAvailableMoves,
  convertToNumericCoordinates,
  validateCordinates,
};
