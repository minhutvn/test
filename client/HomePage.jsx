// import { useState } from 'react';
// import {QRCodeSVG} from 'qrcode.react';

const HomePage = (props) => {
  const [state, setState] = React.useState(0);
  const [url, setUrl] = React.useState('');

  props.socket.on('game created', function (data) {
    // Show the GameID
    const url = window.location.href + "?gameId=" + data.id;
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
            <button className="homePageButton" onClick={() => {
              setState(1);
              props.socket.emit("create game")
            }}>Create Session</button>
            <button className="homePageButton" id="join button">Join Session</button>
            <button className="homePageButton">Play Session</button>
          </div>
        ) : (
          <div className="container text-center">
            <div className="status" id="status">{url}</div>
            <div className="link" id="link"></div>
            {/* <QRCodeSVG value={url} /> */}
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
