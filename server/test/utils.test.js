const {
  validateCordinates,
  convertToNumericCoordinates,
  getAvailableMoves,
} = require('../src/lib/utils');
const { BOARD } = require('../src/constants');

describe('Coordinate validations', () => {
  it('Should return true with valid coordinates', () => {
    const column = String.fromCharCode(97 + BOARD.WIDTH - 1).toUpperCase();
    const row = BOARD.HEIGHT - 1;

    const valid = `${column}${row}`;

    expect(validateCordinates(valid)).toBe(true);
  });

  it('Should return false with out of bounds coordinates (row)', () => {
    const column = String.fromCharCode(97 + BOARD.WIDTH - 1).toUpperCase();
    const row = BOARD.HEIGHT + 1;

    const invalid = `${column}${row}`;

    expect(validateCordinates(invalid)).toBe(false);
  });

  it('Should return false with out of bounds coordinates (column)', () => {
    const column = String.fromCharCode(97 + BOARD.WIDTH + 1).toUpperCase();
    const row = BOARD.HEIGHT - 1;

    const invalid = `${column}${row}`;

    expect(validateCordinates(invalid)).toBe(false);
  });

  it('Should return false with out of bounds coordinates (row, column)', () => {
    const column = String.fromCharCode(97 + BOARD.WIDTH + 1).toUpperCase();
    const row = BOARD.HEIGHT + 1;

    const invalid = `${column}${row}`;

    expect(validateCordinates(invalid)).toBe(false);
  });

  it('Should return false with an invalid format (numbers)', () => {
    const invalid = '34';

    expect(validateCordinates(invalid)).toBe(false);
  });

  it('Should return false with an invalid format (length)', () => {
    const invalid = 'C24';

    expect(validateCordinates(invalid)).toBe(false);
  });
});

describe('Coordinate conversions', () => {
  it('Should correctly convert the coordinate format', () => {
    const letterFormat = 'A1';

    expect(convertToNumericCoordinates(letterFormat)).toStrictEqual([0, 0]);

    const letterFormat2 = 'C4';

    expect(convertToNumericCoordinates(letterFormat2)).toStrictEqual([2, 3]);
  });
});

describe('Available Moves Calculation', () => {
  it('Should only return two possibilities if the origin is at the corner of the board', () => {
    const coordinates = [0, 0];

    const moves = getAvailableMoves(coordinates);

    expect(moves.length).toBe(2);
  });

  it('Should return four possibilities if the origin is at the middle of an edge of the board', () => {
    const coordinates = [3, 0];

    const moves = getAvailableMoves(coordinates);

    expect(moves.length).toBe(4);
  });

  it('Should return eight possibilities if the origin is around the middle of the board', () => {
    const coordinates = [3, 4];

    const moves = getAvailableMoves(coordinates);

    expect(moves.length).toBe(8);
  });
});
