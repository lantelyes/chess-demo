const express = require('express');
const path = require('path');
const {
  getAvailableMoves,
  validateCordinates,
  validateMove,
} = require('./utils');
const { Session } = require('./db/models/session');

const staticDir = path.join(__dirname, '..', '..', '..', 'client', 'build');
const staticIndex = path.join(staticDir, 'index.html');

const initRouter = (app) => {
  //Moves
  app.get('/api/moves/:coordinates', (req, res) => {
    const { coordinates } = req.params;

    if (!validateCordinates(coordinates)) {
      res
        .status(500)
        .send(
          'Invalid coordinate format, must be in algebreaic notation (eg. A1)',
        );
    }

    const result = getAvailableMoves(coordinates);

    res.send(result);
  });

  //Sessions
  app.get('/api/sessions', async (req, res) => {
    const sessions = await Session.find({});

    res.send(sessions);
  });

  app.get('/api/sessions/:id', async (req, res) => {
    const { id } = req.params;

    const sessions = await Session.findOne({ _id: id });

    res.send(sessions);
  });

  app.post('/api/sessions/create', async (req, res) => {
    const { name } = req.body;

    const session = await Session.create({ name });

    res.send(session);
  });

  app.post('/api/sessions/:id/add-move', async (req, res) => {
    const { id } = req.params;

    const { move } = req.body;

    if (!validateMove) {
      res
        .status(500)
        .send(
          'Invalid move format, must be in algebreaic notation with "->" between the corrdinates (eg. A1->C3',
        );
    }

    const updatedSession = await Session.findOneAndUpdate(
      { _id: id },
      { $push: { moves: move } },
      { new: true },
    );

    res.send(updatedSession);
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(staticDir));
    app.get(/^(?!.*(js|json|svg|png|jpg)).*$/, (req, res) =>
      res.sendFile(staticIndex),
    );
  }
};

module.exports = { initRouter };
