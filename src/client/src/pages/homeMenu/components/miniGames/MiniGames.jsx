import React, { useState } from "react";
import GameContainer from "./components/gameContainer";

import style from "./miniGames.module.css";

import gamesInfo from "../../../../data/gamesInfo.json";
import Warning from "../../../../components/Warning";

const MiniGames = (props) => {
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
      <GameContainer
        data={gamesInfo.miniGames[0]}
        isLogin={props.isLogin}
        setIsLogin={props.setIsLogin}
        setShowWarning={setShowWarning}
        setShowWarningText={setShowWarningText}
      />
      <GameContainer
        data={gamesInfo.miniGames[1]}
        isLogin={props.isLogin}
        setIsLogin={props.setIsLogin}
        setShowWarning={setShowWarning}
        setShowWarningText={setShowWarningText}
      />
    </div>
  );
};

export default MiniGames;
