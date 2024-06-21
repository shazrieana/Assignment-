const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  status: { type: String, required: true },
  players: { type: [String], required: true },
  turn: { type: String, required: true },
  board: { type: Array, default: [] },
  moves: { type: Array, default: [] },
});

module.exports = mongoose.model('Game', GameSchema);
