const { createServer } = require("node:http");
const express = require("express");
const { Server } = require("socket.io");

const game = require("./game.js");

const app = express();
const server = createServer(app);
const io = new Server(server);

const fs = require('fs');

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.redirect("index.html");
});

game.setUp(io);


const game_data = fs.createWriteStream("games.csv", { flags: "a" });


let hostEmailData = {};
io.on('connection', (socket) => {
    socket.on('host email', (cdata) => {
        console.log(cdata.email);
        console.log(cdata.gameId);
        hostEmailData[cdata.gameId] = cdata.email;
    });
    socket.on("join email", (jdata) => {
        console.log(jdata.email);
        console.log(jdata.joinId);

        if (hostEmailData[jdata.joinId]) {
            const time = new Date();
            game_data.write(`${jdata.email},${hostEmailData[jdata.joinId]},${jdata.joinId},${time}\n`);
        }
    });
});
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
});