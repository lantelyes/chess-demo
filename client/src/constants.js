export const BOARD = {
  WIDTH: 8,
  HEIGHT: 8,
};

export const COORDINATE_MAP = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

export const TUTORIAL_STEPS = [
  {
    target: '#action-bar',
    content:
      'This is the action panel, here you can create a new session, or load a previous one. Your move history will be stored per session and the in progrsse session can be viewed in the session panel.',
    disableBeacon: true,
    title: 'Actions',
  },
  {
    target: '#session-view',
    title: 'Sessions',
    content:
      'This is the session panel. Your move history for your current session will be shown here. Most recent moves will be at the bottom of the list.',
  },
  {
    target: '#board',
    title: 'Chess Board',
    content:
      'This is the chessboard, here you can select any space by clicking on it. In order to move the knight, click on the space containing it. Valid moves will be highlighted on the board with a "1".  Simply click on one of them to move. A blank board means you need to place the knight, to do this, just click on any space.',
  },
  {
    target: '#legend',
    title: 'Legend',
    content:
      'This is the legend, if you need help figureing out what squares represet what, take a look here.',
  },
];
