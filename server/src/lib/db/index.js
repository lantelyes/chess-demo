const mongoose = require('mongoose');
const { DB_NAME } = require('../../constants');

const initDb = () => {
  mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

module.exports = { initDb };
