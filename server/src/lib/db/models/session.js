const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  moves: { type: [String], default: [] },
});

const Session = mongoose.model('session', sessionSchema);

module.exports = { Session };
