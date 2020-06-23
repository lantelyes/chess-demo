const mongoose = require('mongoose');
const { DB_URL } = require('../../constants');

const initDb = () => {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  return mongoose.connection;
};

module.exports = { initDb };
