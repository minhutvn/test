// import { useState } from 'react';
// import {QRCodeSVG} from 'qrcode.react';

const HomePage = (props) => {
  const [state, setState] = React.useState(0);
  const [url, setUrl] = React.useState('');
  const [gameId, setGameId] = React.useState('');

  props.socket.on('game created', function (data) {
    // Show the GameID
    const url = window.location.href + "?gameId=" + data.id;
    const gameId = data.id;
    setGameId(gameId);
    setUrl(url);
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

      <main className="main">

        {!state ? (
          <div className="button-container">

            <div className="createButton-container">
              <button className="homePageButton" id="createButton" onClick={() => {
                  setState(1);
                  props.socket.emit("create game")
                }}> 
                <span>Create Session</span>
              </button>
              <div className="createInput-wrapper">
                  <input type="text" placeholder="Enter your pseudo"></input>
              </div>
            </div>

            <div className="joinButton-container">
              <button className="homePageButton" id="joinButton" onClick={() => {
                  const org = window.location.href 
                  console.log(org)
                  // window.location.href = org + "?gameId=" + document.getElementById('joinInput').value;
                }}> 
                <span>Join Session</span>
              </button>
              <div className="joinInput-wrapper">
                  <input type="text" placeholder="Enter session ID" id="joinInput"></input>
              </div>
            </div>

          </div>
        ) : (
          <div className="status" id="status">
            Session ID - {gameId}

            <div className="status-sub" id="status-sub">
              <span className="waiting-player" id="waiting-player">Waiting for player...</span>

              <div className="QR-link" id="QR-link"></div>
              {/* <QRCodeSVG value={url} /> */}
            </div>

            <div className="loader"></div>
          </div>
        )}



      </main>

      <button className="help-button"></button>

      <img src='/Assets/Images/Orange/Visual_Obj_1.png' className="top-left-image" />
      <img src='/Assets/Images/Orange/Visual_Obj_7.png' className="center-bottom-image" />

    </div>
  );
}

export default HomePage;
