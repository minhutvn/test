const { randomBytes } = require("node:crypto");

function generateGameId() {
    return randomBytes(4).toString("hex");
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Player {
    /**
     * Constructs a Player
     * @param {String}  playerID    The id of the player
     * @param {Boolean} turn        Whether it is the players turn to move
     */
    constructor(playerID, turn, index) {
        /// Id of the player
        this.id = playerID;
        /// Whether it is the players turn
        this.turn = turn;
        this.index = index;
    }

    /**
     * Checks whether two players are equal
     * @param {Object}  rhs         The other player
     */
    equals(rhs) {
        return (this.id == rhs.id
            && this.turn == rhs.turn && this.index == rhs.index);
    }
}

/**
 * Game Class
 * @class This class holds information about the game
 */
class Game {
    /**
     * Constructs a Game
     * @param {String}  gameID      Id of the game
     */
    constructor(gameID) {
        /// Id of the game
        this.id = gameID;
        /// Information about player1
        this.player1 = null;
        /// Information about player2
        this.player2 = null;
        /// Tic-tac-toe gameboard
        this.gameboard = {
            1: {
                0: 0
                , 1: 0
                , 2: 0
                , 3: 0
                , 4: 0
                , 5: 0
                , 6: 0
                , 7: 0
                , 8: 0
            }, 2: {
                0: 0
                , 1: 0
                , 2: 0
                , 3: 0
                , 4: 0
                , 5: 0
                , 6: 0
                , 7: 0
                , 8: 0
            }
        };
    }

    /**
     * Resets the gameboard and the turn of the players
     */
    reset() {
        // Reset gameboard
        this.gameboard = {
            1: {
                0: 0
                , 1: 0
                , 2: 0
                , 3: 0
                , 4: 0
                , 5: 0
                , 6: 0
                , 7: 0
                , 8: 0
            }, 2: {
                0: 0
                , 1: 0
                , 2: 0
                , 3: 0
                , 4: 0
                , 5: 0
                , 6: 0
                , 7: 0
                , 8: 0
            }
        };

        // Player1 starts the games
        this.player1.turn = true;
        this.player2.turn = false;
    }

    addPlayer(playerID) {
        // Check which player to add (only two players per game)
        if (this.player1 == null) {
            this.player1 = new Player(playerID, true, 1);
            return "player1";
        } else {
            this.player2 = new Player(playerID, false, 2);
            return "player2";
        }
    }

    checkValid(player, cell) {
        // Must check that player is one of the players
        if (player.turn && (this.player1.equals(player) || this.player2.equals(player))) {
            return this.gameboard[player.idex][cell] == 0;
        }

        return false;
    }

    updateBoard(cell, type) {
        // TODO update board logic
        this.updateTurns();
    }

    /**
     * Updates the turns of the players
     */
    updateTurns() {
        this.player1.turn = !this.player1.turn;
        this.player2.turn = !this.player2.turn;
    }

    checkStatus() {
        return 1;
    }
}



const gamesById = {};
const gamesBySocketsId = {};

var games = {};

module.exports.setUp = (io) => {
    io.on("connection", (socket) => {
        socket.on("create game", () => {
            const gameId = generateGameId();
            games[gameId] = new Game(gameId);
            games[gameId].addPlayer(socket.id);

            // gamesById[gameId] = game;
            // gamesBySocketsId[socket.id] = game;
            // Add socket to lobby and emit the gameID to the socket
            socket.join(gameId);
            socket.lobby = gameId;
            socket.emit('game created', {
                id: gameId
            });
        });

        socket.on("join game", (data) => {
            // Check if the game exists
            let gameID = data.gameID.toString();
            if (games[gameID] != null) {
                // Add player to the game
                games[gameID].addPlayer(socket.id);

                // Join lobby
                socket.join(gameID);
                socket.lobby = gameID;

                // Emit data to first player.
                socket.in(gameID).emit('start', {
                    id: gameID, gameboard: games[gameID].gameboard,
                    player: games[gameID].player1
                });

                // Emit data to second player.
                socket.emit("start", {
                    id: gameID, gameboard: games[gameID].gameboard,
                    player: games[gameID].player2
                });

            } else {
                // Game does not exist. Emit a failure to socket.
                socket.emit("failed");
            }
        });

        // socket.on("roll dice", () => {
        //     const game = gamesBySocketsId[socket.id];

        //     if (game?.sockets[game.currentPlayer].id !== socket.id) { return; }
        //     if (game.diceValue !== null) { return; }

        //     const diceValue = randomIntFromInterval(1, 6);
        //     game.diceValue = diceValue;

        //     for (const socket of game.sockets) {
        //         socket.emit("dice rolled", gameObjWithoutSockets(game));
        //     }
        // });

        // socket.on("play row", (rowIndex) => {
        //     if (rowIndex < 0 || rowIndex > 2) { return; }

        //     const game = gamesBySocketsId[socket.id];

        //     if (game?.sockets[game.currentPlayer].id !== socket.id) { return; }
        //     if (game.diceValue === null) { return; }

        //     if (game.state[game.currentPlayer][rowIndex].length >= 3) { return; }

        //     game.state[game.currentPlayer][rowIndex].push(game.diceValue);

        //     const otherPlayer = game.currentPlayer === 0 ? 1 : 0;

        //     game.state[otherPlayer][rowIndex] = game.state[otherPlayer][rowIndex].filter(
        //         (v) => v !== game.diceValue
        //     );

        //     game.diceValue = null;

        //     if (game.state[game.currentPlayer].every((row) => row.length >= 3)) {
        //         game.gameOver = true;
        //     }

        //     game.currentPlayer = otherPlayer;

        //     for (const socket of game.sockets) {
        //         socket.emit("row played", gameObjWithoutSockets(game), rowIndex);
        //     }
        // });

        // socket.on("restart game", () => {
        //     const game = gamesBySocketsId[socket.id];

        //     if (game?.sockets.length !== 2) { return; }

        //     game.currentPlayer = randomIntFromInterval(0, 1);
        //     game.diceValue = null;
        //     game.gameOver = false;
        //     game.state = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => []));

        //     for (const socket of game.sockets) {
        //         socket.emit("game restarted", gameObjWithoutSockets(game));
        //     }
        // });
    });
}