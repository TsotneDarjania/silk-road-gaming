import React, { useContext } from "react";
import GameContainer from "./components/gameContainer";
import style from "./miniGames.module.css";
import gamesInfo from "../../../../data/gamesInfo.json";
import Warning from "../../../../components/Warning";
import PageContext from "../../../../context/PageContext";

const MiniGames = React.memo(() => {
  const pageContext = useContext(PageContext);

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
      {pageContext.warningProps.show && <Warning/>}
      <GameContainer
        data={gamesInfo.miniGames[0]}
      />
      <GameContainer
        data={gamesInfo.miniGames[1]}
      />
      {console.log('minigames')}
    </div>
  );
});

export default MiniGames;
