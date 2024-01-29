const { createServer } = require("node:http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.redirect("index.html");
});

io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("button clicked", () => {
        console.log(`${socket.id} clicked button`);
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
});