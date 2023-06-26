import React, { useState } from "react";
import GameContainer from "./components/gameContainer";

import style from "./miniGames.module.css";
import Shadow from "../../../../components/Shadow";

import gamesInfo from "../../../../data/gamesInfo.json";
import Warning from "../../../../components/Warning";

const MiniGames = (props) => {
  const [show, setShow] = useState(false);
  const shadowProperty = {
    opacity: 0.5,
    transition: "0.5s",
    show: show,
    setShow: setShow,
  };
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setShowWarningText] = useState("");

  return (
    <div
      className={style.miniGames}
      id="mini_games_container"
      onTransitionEnd={(item) => {
        if (
          item.target.style.opacity === 0 &&
          item.target.id === "mini_games_container"
        ) {
          item.target.style.visibility = "hidden";
        }
      }}
    >
      {showWarning && <Warning okState={setShowWarning} text={warningText} />}
      <Shadow props={shadowProperty} />
      <GameContainer
        data={gamesInfo.miniGames[0]}
        setShow={setShow}
        show={show}
        isLogin={props.isLogin}
        setIsLogin={props.setIsLogin}
        setShowWarning={setShowWarning}
        setShowWarningText={setShowWarningText}
      />
      <GameContainer
        data={gamesInfo.miniGames[1]}
        setShow={setShow}
        show={show}
        isLogin={props.isLogin}
        setIsLogin={props.setIsLogin}
        setShowWarning={setShowWarning}
        setShowWarningText={setShowWarningText}
      />
    </div>
  );
};

export default MiniGames;
