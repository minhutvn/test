const socket = io();

function App() {
    return (<div>
        <h1>Hello, world !</h1>
        <button onClick={() => { socket.emit("button clicked") }}>
            Click me !
        </button>
    </div>);
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);