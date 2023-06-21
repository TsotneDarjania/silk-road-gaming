import React, { useEffect, useState } from "react";

import style from "./homeMenu.module.css";
import LatestGame from "./components/latestGame/LatestGame";
import MiniGames from "./components/miniGames/MiniGames";
import ArtGames from "./components/artGame/ArtGames";
import Header from "./components/header/Header";

export const HomeMenu = ({ setRequestedPage, setTransitionPlayAnimation }) => {
  useEffect(() => {
    document.getElementById("mini_games_container").style.display = "none";
    document.getElementById("art_games_container").style.display = "none";
  }, []);

  return (
    <div className={style.homeMenu}>
      <Header />
      <LatestGame />
      <MiniGames />
      <ArtGames />
      <button
        onClick={() => {
          setTransitionPlayAnimation(true);
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
