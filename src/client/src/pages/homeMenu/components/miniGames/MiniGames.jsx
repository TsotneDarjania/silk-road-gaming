import React, { useState } from "react";
import GameContainer from "./components/gameContainer";

import style from "./miniGames.module.css";
import Shadow from "../../../../components/Shadow";

const MiniGames = () => {
  const [show, setShow] = useState(false);
  const shadowProperty = {
    opacity: 0.5,
    transition: "0.5s",
    show: show,
    setShow: setShow,
  };

  return (
    <div className={style.miniGames}>
      <Shadow props={shadowProperty}/>
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
    </div>
  );
};

export default MiniGames;
