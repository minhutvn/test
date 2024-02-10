import HomePage from "./HomePage.js";
import GamePage from "./GamePage.js";

const socket = io();
function getGameId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return params && params.gameId;
}
var game = {};
var player = undefined;

function App() {
    const [stared, setStarted] = React.useState(false);
    const gameId = getGameId();
    console.log(gameId)
    if (gameId) {
        socket.emit('join game', { gameID: gameId });
        console.log("gameID: " + gameId);
    }

    socket.on("start", function (data) {
        setStarted(true);
        console.log("game started");
        // game.id = data.id;
        // game.board = data.gameboard;
        player = data.player;
        // game.diceValue = data.diceValue;
        game = data.game;
        socket.player = data.player;
        // if (data.player.turn == 2) {
        //     let index = data.player.index;
        //     // let buttonRollDiceId = 'roll-dice-player' + index;
        //     // $('#' + buttonRollDiceId).show();
        // }
    });

    if(!stared){
        return (
            <HomePage socket={socket} />
        );
    }
    if(stared){
        return (
            <GamePage game={game} socket={socket} player={player}/>
        );
    }

    // return (<div>
    //     <h1>Hello, world !</h1>
    //     <button onClick={() => { socket.emit("button clicked") }}>
    //         Click me !
    //     </button>
    // </div>);
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);