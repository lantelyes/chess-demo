const { getAvailableMoves, validateCordinates } = require('./utils');
const { Session } = require('./db/models/session');

const initRouter = (app) => {
  //Moves
  app.get('/api/moves/:coordinates', (req, res) => {
    const { coordinates } = req.params;

    if (!validateCordinates(coordinates)) {
      res.status(500).send('Invalid coordinate format');
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

    const updatedSession = await Session.findOneAndUpdate(
      { _id: id },
      { $push: { moves: move } },
      { new: true },
    );

    res.send(updatedSession);
  });
};

module.exports = { initRouter };
