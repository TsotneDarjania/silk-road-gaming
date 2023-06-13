import React, { useState } from "react";
import GameContainer from "./components/gameContainer";

import style from "./miniGames.module.css";

const MiniGames = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={style.miniGames}>
      <div
        className={style.shadow}
        onClick={() => setShow(false)}
        style={{ opacity: show ? 0.5 : 0, zIndex: show ? 50 : -5 }}
      ></div>
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
    </div>
  );
};

export default MiniGames;
