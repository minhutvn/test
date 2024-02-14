// import { useState } from 'react';
// import {QRCodeSVG} from 'qrcode.react';

const HomePage = (props) => {
  const [state, setState] = React.useState(0);
  const [url, setUrl] = React.useState('');
  const [gameId, setGameId] = React.useState('');
  const [email, setEmail] = React.useState('');

  props.socket.on('game created', function (data) {
    // Show the GameID
    const url = window.location.href + "?gameId=" + data.id;
    const gameId = data.id;
    setGameId(gameId);
    setUrl(url);
    props.socket.emit("host email", {
      email: email,
      gameId: gameId
  });
    // document.getElementById("#status").html(`Send this link to other player:`);
    // $("#link").text(url);
    // $('#link').show();

    // const qrcodeContainer = document.getElementById('qrcode');

    // if (inputText !== '') {
    // qrcodeContainer.innerHTML = ''; // Clear any previous QR code

    // const qrcode = new QRCode(qrcodeContainer, {
    //     text: url,
    //     width: 128,
    //     height: 128,
    // });
    // setQrcode(qrcode);
    // $('#qrcode').show();

  });
  return (
    <div className="HomeBody">
      <header>
        <img src="/Assets/Logos/Logo_Light.png" alt="Logo" className="logo"></img>
      </header>

      <img src='/Assets/Images/Orange/Visual_Obj_1.png' className="top-left-image" />
      <img src='/Assets/Images/Orange/Visual_Obj_7.png' className="center-bottom-image" />

      <main className="main">

        {!state ? (
          <div className="button-container">

            <div className="createButton-container">
              <button className="homePageButton" id="createButton" onClick={() => {
                  setState(1);
                  setEmail(document.getElementById('email').value);
                  const email = document.getElementById('email').value;
                  props.socket.emit("create game");
                }}> 
                <span>Create Session</span>
              </button>
              <div className="createInput-wrapper">
                  <input type="text" placeholder="Enter your e-mail" id='email'></input>
              </div>
            </div>

            <div className="joinButton-container">
              <button className="homePageButton" id="joinButton" onClick={() => {
                  const org = window.location.href
                  window.location.href = org + "?gameId=" + document.getElementById('joinInput').value;
                  props.socket.emit("join email", {
                    email: document.getElementById('joinEmail').value,
                    joinId : document.getElementById('joinInput').value
                });
                }}> 
                <span>Join Session</span>
              </button>
              <div className="joinInput-wrapper">
                  <input type="text" placeholder="Enter your e-mail" id="joinEmail"></input>
                  <input type="text" placeholder="Enter session ID" id="joinInput"></input>
              </div>
            </div>

            <p>! Please enter your unique e-mail when creating or joining sessions <br/> to help us analyze game plays...</p>

          </div>
        ) : (
          <div className="status" id="status">
            Session ID - {gameId}

            <div className="status-sub" id="status-sub">
              <span className="waiting-player" id="waiting-player">
                Share the session ID for others to join 
                <br/><br/><br/>
                Waiting for player...
              </span>

              <div className="QR-link" id="QR-link"></div>
              {/* <QRCodeSVG value={url} /> */}
            </div>

            <div className="loader"></div>
          </div>
        )}



      </main>

      <div className="helpButton-container">
        <button>
          <p>
            <b>Game Rules</b>

            <br/><br/>

            The game is played on a board with two grids for each player, each grid having 3 rows and 3 columns. 
            Players roll a dice on their turn and put the number they roll into one of the rows of their grid. 
            The sum of the dice values in each player's grid is their score. The game finishes when one player 
            fills their grid, and the player with the highest score wins.

            <br/><br/>

            In each row, a player can put a maximum of 3 dice. If a player puts more than one dice with the 
            same value in a row, their sum is multiplied by the number of dice. For instance, if a row has 
            3, 2, 3, then the score is calculated as (3 + 3) * 2 + 2 = 14.

            <br/><br/>

            When a player puts a dice in a row, any dice with the same value in the opponent's corresponding 
            row are taken out.
          </p>
        </button>
      </div>

    </div>
  );
}

export default HomePage;
