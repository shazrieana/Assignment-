const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/auth');

router.post('/create', auth, gameController.createGame);
router.post('/join/:gameId', auth, gameController.joinGame);
router.get('/:gameId', auth, gameController.getGameState);
router.post('/:gameId/move', auth, gameController.makeMove);
router.get('/:gameId/history', auth, gameController.getGameHistory);

module.exports = router;
