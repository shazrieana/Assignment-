const Game = require('../models/Game');

exports.createGame = async (req, res) => {
  try {
    const game = new Game({
      status: 'waiting',
      players: [req.user.username],
      turn: req.user.username,
      board: [],
      moves: []
    });

    await game.save();
    res.status(201).send(game);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.joinGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res.status(404).send('Game not found');
    }

    if (game.players.length >= 2) {
      return res.status(400).send('Game is already full');
    }

    game.players.push(req.user.username);
    game.status = 'in-progress';
    await game.save();

    res.send(game);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.getGameState = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.send(game);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.makeMove = async (req, res) => {
  try {
    const { x, y } = req.body.move;
    const game = await Game.findById(req.params.gameId);

    if (game.turn !== req.user.username) {
      return res.status(400).send('Not your turn');
    }

    // Example game logic for a tic-tac-toe game
    game.board[x][y] = req.user.username;
    game.moves.push({ player: req.user.username, move: { x, y } });

    // Switch turn
    game.turn = game.players.find(player => player !== req.user.username);
    await game.save();

    res.send(game);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

exports.getGameHistory = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.send(game.moves);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};
