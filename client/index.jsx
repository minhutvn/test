const socket = io();

socket.on("game created", (game) => {
    console.log(game);
});

function App() {
    return (<div>
        <h1>Hello, world !</h1>
        <button onClick={() => { socket.emit("create game") }}>
            Click me !
        </button>
    </div>);
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);