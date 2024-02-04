const socket = io();

socket.on("game created", (id) => {
    console.log(`game created : ${id}`);
});

function App() {
    return (<div>
        <h1>Hello, world !</h1>
        <button onClick={() => { socket.emit("create game") }}>
            Create Game
        </button>
    </div>);
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);