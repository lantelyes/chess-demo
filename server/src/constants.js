const SERVER_PORT = 5000;

const BOARD = {
  WIDTH: 8,
  HEIGHT: 8,
};

const COORDINATE_MAP = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

const DB_NAME = 'aetest';

module.exports = { BOARD, COORDINATE_MAP, SERVER_PORT, DB_NAME };
