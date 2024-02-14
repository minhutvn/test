const GamePage = (props) => {
  const socket = props.socket;
  const [game, setGame] = React.useState(props.game);
  // const game = props.game;
  let player = props.player;
  const [imageDice, setImageDice] = React.useState('/Assets/Images/Grey/Grid_Cell.png');
  const [turn, setTurn] = React.useState(player.turn);
  const [board, setBoard] = React.useState(game.gameboard);
  const [winner, setWinner] = React.useState(0);

  function userClick(e) {
    let playerIndex = e.currentTarget.getAttribute('playerindex');
    let cellIndex = e.currentTarget.getAttribute('cellindex');

    console.log("clicked: " + cellIndex + "turn: " + turn);
    if (turn == 1) {
      let data = { id: game.id, player: game.player, move: cellIndex, value: game.diceValue, boardIndex: playerIndex };
      socket.emit('move', data);
    }
  }

  socket.on('moved', function (data) {
    setGame(data.game);
    if (data.game.player1.turn == 1) {
      setImageDice('/Assets/Images/Grey/Dice_' + player.value + '.png');
    }
    if (data.game.player1.turn == 2) {
      setImageDice('/Assets/Images/Grey/Grid_Cell.png');

      let rowIndex = Math.floor(data.tile / 3) + 3;
      var playerRadios = document.getElementsByName('radio');
      playerRadios[rowIndex].checked = true;
    }
    if (data.game.player2.turn == 1) {
      setImageDice('/Assets/Images/Orange/Dice_' + player.value + '.png');
    }
    if (data.game.player2.turn == 2) {
      setImageDice('/Assets/Images/Orange/Grid_Cell.png');
      
      let rowIndex = Math.floor(data.tile / 3);
      var playerRadios = document.getElementsByName('radio');
      playerRadios[rowIndex].checked = true;
    }
    setBoard(data.game.gameboard);
    if (player.index == 1) {
      player.turn = data.game.player1.turn;
      player.score = data.game.player1.score;
      player.board = data.game.gameboard['1'];
      game.diceValue = data.diceValue;
    }
    if (player.index == 2) {
      player.turn = data.game.player2.turn;
      player.score = data.game.player2.score;
      player.board = data.game.gameboard['2'];
      game.diceValue = data.diceValue;
    }

    setTurn(player.turn);
    setWinner(data.winner);
    // if (data.player.index == game.player.index) {
    //     game.player.turn = 1;
    //     game.player.value = data.diceValue;
    // }

  })

  socket.on('dice rolled', function (data) {
    // let resultDiceIndex = 'result-board-player'  data.player.index;
    console.log('dice rolled: ' + data.diceValue)
    if (data.game.player1.turn == 1) {
      setImageDice('/Assets/Images/Grey/Dice_' + data.diceValue + '.png');
    }
    if (data.game.player1.turn == 2) {
      setImageDice('/Assets/Images/Grey/Grid_Cell.png');
    }
    if (data.game.player2.turn == 1) {
      setImageDice('/Assets/Images/Orange/Dice_' + data.diceValue + '.png');
    }
    if (data.game.player2.turn == 2) {
      setImageDice('/Assets/Images/Orange/Grid_Cell.png');
    }
    if (player.index == 1) {
      player.turn = data.game.player1.turn;
      player.score = data.game.player1.score;
      player.board = data.game.gameboard['1'];
      game.diceValue = data.diceValue;
    }
    if (player.index == 2) {
      player.turn = data.game.player2.turn;
      player.score = data.game.player2.score;
      player.board = data.game.gameboard['2'];
      game.diceValue = data.diceValue;
    }
    setBoard(data.game.gameboard);
    setTurn(player.turn);
  }
  )

  return (
      <div className={turn == 0 ? "GameBody non-clickable" : "GameBody"}>
        <header>
          <img src="/Assets/Logos/Logo_Dark.png" alt="Logo" className="logo"></img>
        </header>

        <div className="container">
          <section className={player.index == 1 && turn == 1 ? "player1-section" : "player1-section non-clickable"}>

            <div className="player1-info">
              <div className="player1-score" id="player1-score">
                <span>{game.player1.score}</span>
              </div>

              <div className="player1-logo">
                <img src="/Assets/Images/Grey/Player.png" alt="Player 1 Logo"></img>
              </div>
            </div>

            <table className="player1-grid">
              <tbody>
                <tr>
                  <td className={board['1'][0] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='0' onClick={(e) => { userClick(e); }}><img src={board['1'][0] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][0] + ".png"}></img></td>
                  <td className={board['1'][1] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='1' onClick={(e) => { userClick(e); }}><img src={board['1'][1] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][1] + ".png"}></img></td>
                  <td className={board['1'][2] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='2' onClick={(e) => { userClick(e); }} ><img src={board['1'][2] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][2] + ".png"}></img></td>
                  <td>
                    <label className="player1-radio-label">
                      <span className="player1-radio-custom">
                        <input type="radio" name="radio" className="player1-radio-input"></input>
                        <span className="player1-checkmark"></span>
                      </span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className={board['1'][3] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='3' onClick={(e) => { userClick(e); }}><img src={board['1'][3] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][3] + ".png"}></img></td>
                  <td className={board['1'][4] == 0 ? "clickable" : "non-clickable"}playerindex='1' cellindex='4' onClick={(e) => { userClick(e); }}><img src={board['1'][4] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][4] + ".png"}></img></td>
                  <td className={board['1'][5] == 0 ? "clickable" : "non-clickable"}playerindex='1' cellindex='5' onClick={(e) => { userClick(e); }}><img src={board['1'][5] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][5] + ".png"}></img></td>
                  <td>
                    <label className="player1-radio-label">
                      <span className="player1-radio-custom">
                        <input type="radio" name="radio" className="player1-radio-input"></input>
                        <span className="player1-checkmark"></span>
                      </span>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className={board['1'][6] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='6' onClick={(e) => { userClick(e); }}><img src={board['1'][6] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][6] + ".png"}></img></td>
                  <td className={board['1'][7] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='7' onClick={(e) => { userClick(e); }}><img src={board['1'][7] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][7] + ".png"}></img></td>
                  <td className={board['1'][8] == 0 ? "clickable" : "non-clickable"} playerindex='1' cellindex='8' onClick={(e) => { userClick(e); }}><img src={board['1'][8] == 0 ? "/Assets/Images/Grey/Empty_Cell.png" : "/Assets/Images/Grey/Dice_" + board['1'][8] + ".png"}></img></td>
                  <td>
                    <label className="player1-radio-label">
                      <span className="player1-radio-custom">
                        <input type="radio" name="radio" className="player1-radio-input"></input>
                        <span className="player1-checkmark"></span>
                      </span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>

          </section>
          {winner == 0 ? 
            (turn == 2 ?
              // {/* <button className="game-button">Select Row</button> */ }
              (
                <section className="game-section">
                  <button className="game-button" onClick={() => {
                    let data = { id: game.id, player: player };
                    socket.emit("roll dice", data);
                  }}>Roll dice</button>
                  <div className="random-dice">
                    <img src={imageDice}></img>
                  </div>
                </section>)
              : (<section className="game-section">
                {turn == 1 ? (<div>Select Row Cell</div>) : (<div>Opponent's turn</div>)}
                <div className="random-dice">
                  <img src={imageDice}></img>
                </div>
              </section>)
            )

            : (
              <section className="winner-section">
                  {winner == 1 ?
                      (<span id="winner1-section">Player 1 won the game!</span>)
                    : (<span id="winner2-section">Player {winner} won the game!</span>)
                  } 

                <div className="winner-logo">
                  {winner == 1 ?
                      (<img src="/Assets/Images/Grey/Winner.png"></img>)
                    : (<img src="/Assets/Images/Orange/Winner.png"></img>)
                  }
                </div>
              </section>
          )
           
          }
          

          <section className={player.index == 2 && turn == 1 ? "player2-section" : "player2-section non-clickable"}>

            <table className="player2-grid">
              <tbody>
                <tr>
                  <td>
                    <label className="player2-radio-label">
                      <span className="player2-radio-custom">
                        <input type="radio" name="radio" className="player2-radio-input"></input>
                        <span className="player2-checkmark"></span>
                      </span>
                    </label>
                  </td>
                  <td className={board['2'][0] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='0' onClick={(e) => { userClick(e); }}><img src={board['2'][0] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][0] + ".png"}></img></td>
                  <td className={board['2'][1] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='1' onClick={(e) => { userClick(e); }}><img src={board['2'][1] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][1] + ".png"}></img></td>
                  <td className={board['2'][2] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='2' onClick={(e) => { userClick(e); }}><img src={board['2'][2] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][2] + ".png"}></img></td>
                </tr>
                <tr>
                  <td>
                    <label className="player2-radio-label">
                      <span className="player2-radio-custom">
                        <input type="radio" name="radio" className="player2-radio-input"></input>
                        <span className="player2-checkmark"></span>
                      </span>
                    </label>
                  </td>
                  <td className={board['2'][3] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='3' onClick={(e) => { userClick(e); }}><img src={board['2'][3] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][3] + ".png"}></img></td>
                  <td className={board['2'][4] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='4' onClick={(e) => { userClick(e); }}><img src={board['2'][4] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][4] + ".png"}></img></td>
                  <td className={board['2'][5] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='5' onClick={(e) => { userClick(e); }}><img src={board['2'][5] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][5] + ".png"}></img></td>
                </tr>
                <tr>
                  <td>
                    <label className="player2-radio-label">
                      <span className="player2-radio-custom">
                        <input type="radio" name="radio" className="player2-radio-input"></input>
                        <span className="player2-checkmark"></span>
                      </span>
                    </label>
                  </td>
                  <td className={board['2'][6] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='6' onClick={(e) => { userClick(e); }}><img src={board['2'][6] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][6] + ".png"}></img></td>
                  <td className={board['2'][7] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='7' onClick={(e) => { userClick(e); }}><img src={board['2'][7] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][7] + ".png"}></img></td>
                  <td className={board['2'][8] == 0 ? "clickable" : "non-clickable"} playerindex='2' cellindex='8' onClick={(e) => { userClick(e); }}><img src={board['2'][8] == 0 ? "/Assets/Images/Orange/Empty_Cell.png" : "/Assets/Images/Orange/Dice_" + board['2'][8] + ".png"}></img></td>
                </tr>
              </tbody>
            </table>

            <div className="player2-info">
              <div className="player2-score" id="player2-score">
                <span>{game.player2.score}</span>
              </div>

              <div className="player2-logo">
                <img src="/Assets/Images/Orange/Player.png" alt="Player 2 Logo"></img>
              </div>
            </div>

          </section>

        </div>

        <span className="session-id">Session ID - {game.id}</span>

        <img src='/Assets/Images/Orange/Visual_Obj_1.png' className="top-right-image" />
      </div>
  );

}

export default GamePage;
