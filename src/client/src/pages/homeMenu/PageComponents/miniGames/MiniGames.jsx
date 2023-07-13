import React, { useContext, useState } from "react";
import GameContainer from "./components/gameContainer";
import style from "./miniGames.module.css";
import gamesInfo from "../../../../data/gamesInfo.json";
import Warning from "../../../../components/warning/Warning";
import PageContext from "../../../../context/PageContext";

const MiniGames = React.memo(() => {
  const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false);
  const pageContext = useContext(PageContext);
  return (
    <div
      className={style.miniGames}
      style={{ zIndex: showLeaderBoardModal ? 3 : 1 }}
    >
      {pageContext.warningProps.show && <Warning />}
      <GameContainer
        data={gamesInfo.miniGames[0]}
        showLeaderBoardModal={showLeaderBoardModal}
        setShowLeaderBoardModal={setShowLeaderBoardModal}
      />
      <GameContainer
        data={gamesInfo.miniGames[1]}
        showLeaderBoardModal={showLeaderBoardModal}
        setShowLeaderBoardModal={setShowLeaderBoardModal}
      />
    </div>
  );
});

export default MiniGames;
