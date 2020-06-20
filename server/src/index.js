const express = require('express');
const { initRouter } = require('./lib/router');
const { SERVER_PORT } = require('./constants');
const bodyParser = require('body-parser');
const { initDb } = require('./lib/db/index');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

initDb();
initRouter(app);

app.listen(SERVER_PORT, () =>
  console.log(`Server is up: http://localhost:${SERVER_PORT}`),
);
