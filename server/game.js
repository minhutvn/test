const { randomBytes } = require("node:crypto");

function generateGameId() {
    return randomBytes(4).toString("hex");
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameObjWithoutSockets(game) {
    return { ...game, sockets: undefined };
}

const gamesById = {};
const gamesBySocketsId = {};

module.exports.setUp = (io) => {
    io.on("connection", (socket) => {
        socket.on("create game", () => {
            const gameId = generateGameId();
            const game = {
                id: gameId,
                sockets: [socket],
                currentPlayer: null,
                diceValue: null,
                gameOver: false,
                state: Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => []))
            };

            gamesById[gameId] = game;
            gamesBySocketsId[socket.id] = game;

            socket.emit("game created", gameObjWithoutSockets(game));
        });

        socket.on("join game", (gameId) => {
            const game = gamesById[gameId];

            if (game?.sockets.length !== 1) { return; }

            game.sockets.push(socket);
            gamesBySocketsId[socket.id] = game;

            game.currentPlayer = randomIntFromInterval(0, 1);

            for (const socket of game.sockets) {
                socket.emit("game joined", gameObjWithoutSockets(game));
            }
        });

        socket.on("roll dice", () => {
            const game = gamesBySocketsId[socket.id];

            if (game?.sockets[game.currentPlayer].id !== socket.id) { return; }
            if (game.diceValue !== null) { return; }

            const diceValue = randomIntFromInterval(1, 6);
            game.diceValue = diceValue;

            for (const socket of game.sockets) {
                socket.emit("dice rolled", gameObjWithoutSockets(game));
            }
        });

        socket.on("play row", (rowIndex) => {
            if (rowIndex < 0 || rowIndex > 2) { return; }

            const game = gamesBySocketsId[socket.id];

            if (game?.sockets[game.currentPlayer].id !== socket.id) { return; }
            if (game.diceValue === null) { return; }

            if (game.state[game.currentPlayer][rowIndex].length >= 3) { return; }

            game.state[game.currentPlayer][rowIndex].push(game.diceValue);

            const otherPlayer = game.currentPlayer === 0 ? 1 : 0;

            game.state[otherPlayer][rowIndex] = game.state[otherPlayer][rowIndex].filter(
                (v) => v !== game.diceValue
            );

            game.diceValue = null;

            if (game.state[game.currentPlayer].every((row) => row.length >= 3)) {
                game.gameOver = true;
            }

            game.currentPlayer = otherPlayer;

            for (const socket of game.sockets) {
                socket.emit("row played", gameObjWithoutSockets(game), rowIndex);
            }
        });

        socket.on("restart game", () => {
            const game = gamesBySocketsId[socket.id];

            if (game?.sockets.length !== 2) { return; }

            game.currentPlayer = randomIntFromInterval(0, 1);
            game.diceValue = null;
            game.gameOver = false;
            game.state = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => []));

            for (const socket of game.sockets) {
                socket.emit("game restarted", gameObjWithoutSockets(game));
            }
        });
    });
}