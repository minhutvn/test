const GamePage = () => {
  return (
    <div className="GameBody">
        <header>
            <img src="/Assets/Logos/Logo_Dark.png" alt="Logo" className="logo"></img>
        </header>

        <div className="container">
          <section className="player1-section">

            <div className="player1-info">
              <div className="player1-score" id="player1-score">
                <span>63</span>
              </div>

              <div className="player1-logo">
                <img src="/Assets/Images/Grey/Player.png" alt="Player 1 Logo"></img>
              </div>
            </div>

            <table className="player1-grid">
                <tbody>
                    <tr>
                        <td><img src="/Assets/Images/Grey/Dice_1.png"></img></td>
                        <td><img src="/Assets/Images/Grey/Dice_2.png"></img></td>
                        <td></td>
                        <td>
                          <label className="player1-radio-label">
                            <span className="player1-radio-custom">
                              <input type="radio" name="radio1" className="player1-radio-input"></input>
                              <span className="player1-checkmark"></span>
                            </span>
                          </label>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="/Assets/Images/Grey/Dice_4.png"></img></td>
                        <td><img src="/Assets/Images/Grey/Dice_5.png"></img></td>
                        <td><img src="/Assets/Images/Grey/Dice_6.png"></img></td>
                        <td>
                          <label className="player1-radio-label">
                            <span className="player1-radio-custom">
                              <input type="radio" name="radio1" className="player1-radio-input"></input>
                              <span className="player1-checkmark"></span>
                            </span>
                          </label>
                        </td>
                    </tr>
                    <tr>
                        <td><img src="/Assets/Images/Grey/Dice_3.png"></img></td>
                        <td><img src="/Assets/Images/Grey/Dice_5.png"></img></td>
                        <td><img src="/Assets/Images/Grey/Dice_1.png"></img></td>
                        <td>
                          <label className="player1-radio-label">
                            <span className="player1-radio-custom">
                              <input type="radio" name="radio1" className="player1-radio-input"></input>
                              <span className="player1-checkmark"></span>
                            </span>
                          </label>
                        </td>
                    </tr>
                </tbody>
            </table>

          </section>

          <section className="game-section">
            
              <button className="game-button">Select Row</button>

              <div className="random-dice">
                <img src="/Assets/Images/Orange/Dice_1.png"></img>
              </div>
          </section>

          <section className="player2-section">

            <table className="player2-grid">
                <tbody>
                    <tr>
                        <td>
                          <label className="player2-radio-label">
                            <span className="player2-radio-custom">
                              <input type="radio" name="radio2" className="player2-radio-input"></input>
                              <span className="player2-checkmark"></span>
                            </span>
                          </label>
                        </td>
                        <td></td>
                        <td><img src="/Assets/Images/Orange/Dice_1.png"></img></td>
                        <td><img src="/Assets/Images/Orange/Dice_2.png"></img></td>
                    </tr>
                    <tr>
                        <td>
                          <label className="player2-radio-label">
                            <span className="player2-radio-custom">
                              <input type="radio" name="radio2" className="player2-radio-input"></input>
                              <span className="player2-checkmark"></span>
                            </span>
                          </label>
                        </td>
                        <td><img src="/Assets/Images/Orange/Dice_4.png"></img></td>
                        <td><img src="/Assets/Images/Orange/Dice_5.png"></img></td>
                        <td><img src="/Assets/Images/Orange/Dice_6.png"></img></td>
                    </tr>
                    <tr>
                        <td>
                          <label className="player2-radio-label">
                            <span className="player2-radio-custom">
                              <input type="radio" name="radio2" className="player2-radio-input"></input>
                              <span className="player2-checkmark"></span>
                            </span>
                          </label>
                        </td>
                        <td><img src="/Assets/Images/Orange/Dice_3.png"></img></td>
                        <td><img src="/Assets/Images/Orange/Dice_5.png"></img></td>
                        <td><img src="/Assets/Images/Orange/Dice_3.png"></img></td>
                    </tr>
                </tbody>
            </table>

            <div className="player2-info">
              <div className="player2-score" id="player2-score">
                <span>26</span>
              </div>

              <div className="player2-logo">
                <img src="/Assets/Images/Orange/Player.png" alt="Player 2 Logo"></img>
              </div>
            </div>

          </section>

        </div>

        <button className="help-button"></button>

        <span className="session-id">Session ID - IDX3G45</span>

        <img src='/Assets/Images/Orange/Visual_Obj_1.png' className="top-right-image" />

    </div>
  );
}

export default GamePage;
