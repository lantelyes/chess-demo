const { getAvailableMoves, validateCordinates } = require('../utils');

const initRouter = (app) => {
  app.get('/moves/:coordinates', function (req, res) {
    const { coordinates } = req.params;

    if (!validateCordinates(coordinates)) {
      res.status(500).send('Invalid coordinate format');
    }

    const result = getAvailableMoves(coordinates);

    res.send(result);
  });
};

module.exports = initRouter();
