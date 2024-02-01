const { createServer } = require("node:http");
const express = require("express");
const { Server } = require("socket.io");

const game = require("./game.js");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.redirect("index.html");
});

game.setUp(io);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
});