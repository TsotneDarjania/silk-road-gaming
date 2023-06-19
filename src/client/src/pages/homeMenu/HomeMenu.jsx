import React, { useEffect, useState } from "react";

import style from "./homeMenu.module.css";
import LatestGame from "./components/latestGame/LatestGame";
import MiniGames from "./components/miniGames/MiniGames";
import ArtGames from "./components/artGame/ArtGames";

export const HomeMenu = ({ setRequestedPage, setTransitionPlayAnimation }) => {
  const [menuMode, setMenuMode] = useState("latest-game");

  const [menuClasses, setMenuClasses] = useState({
    "mini-games": "",
    "latest-game": "selected-li",
    "art-games": " ",
  });
  const [menuItemClases, setMenuItemClasses] = useState({
    "mini-games": "",
    "latest-game": "show-item",
    "art-games": " ",
  });

  const changeMode = (mode) => {
    setMenuMode(mode);
    setMenuClasses({
      ["mini-games"]: mode === "mini-games" ? "selected-li" : "",
      ["latest-game"]: mode === "latest-game" ? "selected-li" : "",
      ["art-games"]: mode === "art-games" ? "selected-li" : "",
    });
    setMenuItemClasses({
      ["mini-games"]: mode === "mini-games" ? "show-item" : "",
      ["latest-game"]: mode === "latest-game" ? "show-item" : "",
      ["art-games"]: mode === "art-games" ? "show-item" : "",
    });
  };

  return (
    <div className={style.homeMenu}>
      <ul className={style.header}>
        <li
          onClick={() => {
            changeMode("mini-games");
          }}
          className={style["menu-li"] + " " + style[menuClasses["mini-games"]]}
        >
          Mini Games
        </li>
        <li
          onClick={() => {
            changeMode("latest-game");
          }}
          className={style["menu-li"] + " " + style[menuClasses["latest-game"]]}
        >
          Latest Game
        </li>
        <li
          onClick={() => {
            changeMode("art-games");
          }}
          className={style["menu-li"] + " " + style[menuClasses["art-games"]]}
        >
          Art Game
        </li>
      </ul>
      <div
        className={
          style["menu-item"] + " " + style[menuItemClases["latest-game"]]
        }
      >
        <LatestGame />
      </div>
      <div
        className={
          style["menu-item"] + " " + style[menuItemClases["mini-games"]]
        }
      >
        <MiniGames />
      </div>
      <div
        className={
          style["menu-item"] + " " + style[menuItemClases["art-games"]]
        }
      >
        <ArtGames />
      </div>
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
