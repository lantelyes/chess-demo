const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    moves: { type: [String], default: [] },
  },
  { timestamps: true },
);

const Session = mongoose.model('session', sessionSchema);

module.exports = { Session };
