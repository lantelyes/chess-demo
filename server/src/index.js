const express = require('express');
const { initRouter } = require('./lib/router');
const { SERVER_PORT } = require('./constants');

const app = express();

initRouter(app);

app.listen(SERVER_PORT, () =>
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`),
);
