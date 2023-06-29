import React, { useState } from "react";
import style from "./header.module.css";

const Header = React.memo(({handleMenuChange, defaultMode}) => {
  const [active, setActive] = useState(defaultMode);
  
  const handleMenuBtn = (mode) => {
    handleMenuChange(mode)
    setActive(mode)
  }

  return (
    <ul className={style.header}>
      <li
        onClick={() => {
          handleMenuBtn("mini_games")
        }}
        className={`${style.menuLi} ${
          active === "mini_games" ? style.selectedLi : ""
        }`}
      >
        Mini Games
      </li>
      <li
        onClick={() => {
          handleMenuBtn("latest_game")
        }}
        className={`${style.menuLi} ${
          active === "latest_game" ? style.selectedLi : ""
        }`}
      >
        Latest Game
      </li>
      <li
        onClick={() => {
          handleMenuBtn("art_games")
        }}
        className={`${style.menuLi} ${
          active === "art_games" ? style.selectedLi : ""
        }`}
      >
        Art Game
      </li>
    </ul>
  );
});

export default Header;
