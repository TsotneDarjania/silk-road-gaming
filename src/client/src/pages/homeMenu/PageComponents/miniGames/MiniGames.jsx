import React, { useContext } from "react";
import GameContainer from "./components/gameContainer";
import style from "./miniGames.module.css";
import gamesInfo from "../../../../data/gamesInfo.json";
import Warning from "../../../../components/warning/Warning";
import PageContext from "../../../../context/PageContext";

const MiniGames = React.memo(() => {
  const pageContext = useContext(PageContext);

  return (
    <div
      className={style.miniGames}>
      {pageContext.warningProps.show && <Warning/>}
      <GameContainer
        data={gamesInfo.miniGames[0]}
      />
      <GameContainer
        data={gamesInfo.miniGames[1]}
      />
    </div>
  );
});

export default MiniGames;
