const express = require('express');
const { initRouter } = require('./lib/router');
const { SERVER_PORT } = require('./constants');
const { initDb } = require('./lib/db/index');

const app = express();
app.use(express.json());

initDb();
initRouter(app);

app.listen(SERVER_PORT, () =>
  console.log(`Server is up: http://localhost:${SERVER_PORT}`),
);
