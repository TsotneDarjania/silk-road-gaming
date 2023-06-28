import React, {useEffect } from "react";

import style from "./homeMenu.module.css";
import LatestGame from "./components/latestGame/LatestGame";
import MiniGames from "./components/miniGames/MiniGames";
import ArtGames from "./components/artGame/ArtGames";
import Header from "./components/header/Header";

export const HomeMenu = ({
  setRequestedPage
}) => {
  useEffect(() => {
    document.getElementById("mini_games_container").style.visibility = "hidden";
    document.getElementById("art_games_container").style.visibility = "hidden";
  }, []);
  return (
    <div className={style.homeMenu}>
      <Header />
      <LatestGame/>
      <MiniGames/>
      <ArtGames/>
      <button
        onClick={() => {
          setRequestedPage("homePage");
        }}
        type="button"
        className={style.homeButton}
      >
        Home
      </button>
    </div>
  );
};
