import React, { useEffect, useContext, useRef } from "react";

import style from "./homeMenu.module.css";
import PageContext from "../../context/PageContext";
import LatestGame from "./PageComponents/latestGame/LatestGame";
import MiniGames from "./PageComponents/miniGames/MiniGames";
import ArtGames from "./PageComponents/artGame/ArtGames";
import Header from "./PageComponents/header/Header";

export const HomeMenu = () => {
  const latestGameRef = useRef(null);
  const miniGamesRef = useRef(null);
  const artGamesRef = useRef(null);

  // change mode for menu
  const defaultMode = "latest_game";

  const handleMenuChange = (mode) => {
    latestGameRef.current.style.opacity = mode === "latest_game" ? 1 : 0;
    miniGamesRef.current.style.opacity = mode === "mini_games" ? 1 : 0;
    artGamesRef.current.style.opacity = mode === "art_games" ? 1 : 0;
    
    latestGameRef.current.style.visibility =
      mode === "latest_game" ? "visible" : "hidden";
    miniGamesRef.current.style.visibility =
      mode === "mini_games" ? "visible" : "hidden";
    artGamesRef.current.style.visibility =
      mode === "art_games" ? "visible" : "hidden";
  };

  useEffect(() => {
    handleMenuChange(defaultMode);
  }, []);
  // ///////////////

  const pageContext = useContext(PageContext);

  return (
    <div className={style.homeMenu}>
      <Header handleMenuChange={handleMenuChange} defaultMode={defaultMode} />
      <div ref={latestGameRef} className={style.latestGame}>
        <LatestGame />
      </div>
      <div ref={miniGamesRef} className={style.miniGames}>
        <MiniGames />
      </div>
      <div ref={artGamesRef} className={style.artGames}>
        <ArtGames />
      </div>
      <button
        onClick={() => {
          pageContext.setRequestedPage("homePage");
        }}
        type="button"
        className={style.homeButton}
      >
        Home
      </button>
    </div>
  );
};
