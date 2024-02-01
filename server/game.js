const { randomBytes } = require("node:crypto");

function generateGameId() {
    return randomBytes(4).toString("hex");
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
                // array of 0 of shape (2, 3, 3)
                state: Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0)))
            };

            gamesById[gameId] = game;
            gamesBySocketsId[socket.id] = game;

            socket.emit("game created", game)
        });

        socket.on("join game", (gameId) => {
            const game = gamesById[gameId];

            if (game?.sockets.length != 1) { return; }

            game.sockets.push(socket);
            gamesBySocketsId[socket.id] = game;

            for (const socket in game.sockets) {
                socket.emit("game joined", game);
            }
        });
    });
}