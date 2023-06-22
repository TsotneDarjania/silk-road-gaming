import React, { useState } from "react";
import GameContainer from "./components/gameContainer";

import style from "./miniGames.module.css";
import Shadow from "../../../../components/Shadow";

const MiniGames = (props) => {
  const [show, setShow] = useState(false);
  const shadowProperty = {
    opacity: 0.5,
    transition: "0.5s",
    show: show,
    setShow: setShow,
  };

  return (
    <div
      className={style.miniGames}
      id="mini_games_container"
      onTransitionEnd={(item) => {
        if (
          item.target.style.opacity === "0" &&
          item.target.id === "mini_games_container"
        ) {
          item.target.style.visibility = "hidden";
        }
      }}
    >
      <Shadow props={shadowProperty} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
      <GameContainer setShow={setShow} show={show} />
    </div>
  );
};

export default MiniGames;
