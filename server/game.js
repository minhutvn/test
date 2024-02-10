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
        this.score = 0;
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
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0], 2: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        this.diceValue = 0;
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
        this.player1.turn = 2;
        this.player2.turn = 0;
    }

    addPlayer(playerID) {
        // Check which player to add (only two players per game)
        if (this.player1 == null) {
            this.player1 = new Player(playerID, 2, 1);
            return "player1";
        } else {
            this.player2 = new Player(playerID, 0, 2);
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
            // socket.lobby = gameId;
            socket.emit('game created', {
                id: gameId
            });
        });

        socket.on("join game", (data) => {
            console.log("current socket: " + socket.id + " receive  join game " + data.socket);

            // Check if the game exists
            let gameID = data.gameID.toString();
            if (games[gameID] != null) {
                // Add player to the game
                games[gameID].addPlayer(socket.id);

                // Join lobby
                socket.join(gameID);
                // Emit data to first player.
                socket.to(gameID).emit('start', {
                    id: gameID, gameboard: games[gameID].gameboard,
                    player: games[gameID].player1, diceValue:games[gameID]['diceValue'],
                    game : games[gameID]
                });
                console.log("emitted start")

                // Emit data to second player.
                socket.emit("start", {
                    id: gameID, gameboard: games[gameID].gameboard,
                    player: games[gameID].player2, diceValue:games[gameID]['diceValue'],
                    game : games[gameID]

                });

            } else {
                // Game does not exist. Emit a failure to socket.
                socket.emit("failed");
            }
        });

        socket.on("roll dice", (data) => {
            // const game = gamesBySocketsId[socket.id];

            // if (game?.sockets[game.currentPlayer].id !== socket.id) { return; }
            // if (game.diceValue !== null) { return; }
            const game = games[data.id];
            const index = data.player.index;
            if (index == 1) {
                game.player1.turn = 1;
            }
            if (index == 2) {
                game.player2.turn = 1;
            }

            const diceValue = randomIntFromInterval(1, 6);
            // game.diceValue = diceValue;
            // data.diceValue = diceValue;
            game.diceValue = diceValue;
            const dataNew = { game: games[data.id], diceValue: diceValue }
            console.log('dice rolled' + dataNew.toString());
            socket.to(data.id).emit("dice rolled", dataNew);
            socket.emit("dice rolled", dataNew);
        });

        socket.on("move", (data) => {
            console.log('move: '+ data.toString());
            const move = data.move;
            var dataNew = {  tile: move, diceValue: data.value , winner : 0}

            if (data.boardIndex == 1) { // player 1
                games[data.id].gameboard[data.boardIndex][move] = data.value;
                games[data.id].player1.turn = 0;
                // games[data.id].player1.score = games[data.id].gameboard[1].reduce((a, b) => a + b, 0);
                games[data.id].player1.score = calculateBoard(games[data.id].gameboard[1]);

                // add code check win
                games[data.id].player2.turn = 2;
                updateBoardopponent(games[data.id].player2, move , games[data.id].gameboard[2], data.value)
                if(matchWinCondition(games[data.id].gameboard[1])){
                    dataNew.winner = data.boardIndex;
                }

            }


            if (data.boardIndex == 2) { // player 2
                games[data.id].gameboard[2][move] = data.value;
                games[data.id].player2.turn = 0;
                games[data.id].player2.score = calculateBoard(games[data.id].gameboard[2]);

                // add code check win
                games[data.id].player1.turn = 2;
                updateBoardopponent(games[data.id].player1, move, games[data.id].gameboard[1], data.value)

                if(matchWinCondition(games[data.id].gameboard[2])){
                    dataNew.winner = data.boardIndex;
                }
            }
            dataNew.game= games[data.id];
            socket.to(data.id).emit("moved", dataNew);
            console.log(dataNew)
            socket.emit("moved", dataNew);


            // data.player.turn = 0;

            // if (rowIndex < 0 || rowIndex > 2) { return; }

            // const game = gamesBySocketsId[socket.id];

            // if (game?.sockets[game.currentPlayer].id !== socket.id) { return; }
            // if (game.diceValue === null) { return; }

            // if (game.state[game.currentPlayer][rowIndex].length >= 3) { return; }

            // game.state[game.currentPlayer][rowIndex].push(game.diceValue);

            // const otherPlayer = game.currentPlayer === 0 ? 1 : 0;

            // game.state[otherPlayer][rowIndex] = game.state[otherPlayer][rowIndex].filter(
            //     (v) => v !== game.diceValue
            // );

            // game.diceValue = null;

            // if (game.state[game.currentPlayer].every((row) => row.length >= 3)) {
            //     game.gameOver = true;
            // }

            // game.currentPlayer = otherPlayer;

            // for (const socket of game.sockets) {
            //     socket.emit("row played", gameObjWithoutSockets(game), rowIndex);
            // }
        });

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

function matchWinCondition(gameBoard){
    for(let i = 0; i< 9; i++){
        if(gameBoard[i]== 0) return false;
    }
    return true;
}

function updateBoardopponent(player, move, gameBoard, value) {
    const rowIndex = Math.floor(move / 3);
    console.log("player.index: "+ player.index + "gameBoard: "+ gameBoard);
    console.log("value: "+ value + "rowIndex: " +rowIndex);

    if (gameBoard[rowIndex * 3] == value) gameBoard[rowIndex * 3] = 0;
    if (gameBoard[rowIndex * 3 + 1] == value) gameBoard[rowIndex * 3 + 1] = 0;
    if (gameBoard[rowIndex * 3 + 2] == value) gameBoard[rowIndex * 3 + 2] = 0;
    player.score = calculateBoard(gameBoard);

}
function calculateBoard(board){
    console.log('board:' + board)
    let sum1 = calculateRow(board.slice(0,3));
    let sum2 = calculateRow(board.slice(3,6));
    let sum3 = calculateRow(board.slice(6,9));
    return sum1+ sum2 + sum3;
}

function calculateRow(diceValues) {
    console.log('diceValues:' + diceValues)

    // Create an object to store the count of each dice value
    const diceCount = {};
  
    // Calculate the count of each dice value
    diceValues.forEach(value => {
      if (diceCount[value]) {
        diceCount[value]++;
      } else {
        diceCount[value] = 1;
      }
    });
  
    // Calculate the sum based on the specified rule
    let sum = 0;
    for (const value in diceCount) {
        sum += (parseInt(value) * diceCount[value] * diceCount[value]);
    }
    console.log('diceCount: ' + diceCount.toString());
    console.log('sum: ' + sum);
    return sum;
  }
