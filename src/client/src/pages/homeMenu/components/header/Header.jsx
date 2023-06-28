import React, { useState } from "react";
import style from "./header.module.css";

const Header = () => {
  const [active, setActive] = useState("latest_game");

  const handleMenuChange = (mode) => {
    setActive(mode);
    document.getElementById(mode + "_container").style.visibility = "visible";
    document.getElementById("latest_game_container").style.opacity =
      mode === "latest_game" ? 1 : 0;
    document.getElementById("art_games_container").style.opacity =
      mode === "art_games" ? 1 : 0;
    document.getElementById("mini_games_container").style.opacity =
      mode === "mini_games" ? 1 : 0;
  };

  return (
    <ul className={style.header}>
      <li
        onClick={() => {
          handleMenuChange("mini_games");
        }}
        className={`${style.menuLi} ${
          active === "mini_games" ? style.selectedLi : ""
        }`}
      >
        Mini Games
      </li>
      <li
        onClick={() => {
          handleMenuChange("latest_game");
        }}
        className={`${style.menuLi} ${
          active === "latest_game" ? style.selectedLi : ""
        }`}
      >
        Latest Game
      </li>
      <li
        onClick={() => {
          handleMenuChange("art_games");
        }}
        className={`${style.menuLi} ${
          active === "art_games" ? style.selectedLi : ""
        }`}
      >
        Art Game
      </li>
      {console.log('header')}
    </ul>
  );
};

export default Header;
