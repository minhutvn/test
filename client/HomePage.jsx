const HomePage = () => {
  return (
    <div className="HomeBody">
        <header>
            <img src="/Assets/Logos/Logo_Light.png" alt="Logo" className="logo"></img>
        </header>

        <main className="main">
            <div className="button-container">
                <button className="homePageButton">Create Session</button>
                <button className="homePageButton">Join Session</button>
                <button className="homePageButton">Play Session</button>
            </div>
        </main>

        <button className="help-button"></button>

        <img src='/Assets/Images/Orange/Visual_Obj_1.png' className="top-left-image" />
        <img src='/Assets/Images/Orange/Visual_Obj_7.png' className="center-bottom-image" />

    </div>
  );
}

export default HomePage;
