const mongoose = require('mongoose');
const { DB_NAME, DB_URL } = require('../../constants');

const initDb = () => {
  mongoose.connect(`${DB_URL}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

module.exports = { initDb };
