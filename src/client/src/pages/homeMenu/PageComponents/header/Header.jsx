import React, { useEffect, useRef, useState } from "react";
import style from "./header.module.css";
import { CgMenuGridR } from "react-icons/cg";

const Header = React.memo(({ handleMenuChange, defaultMode }) => {
  const [active, setActive] = useState(defaultMode);
  const [isShowHeader, setIsShowHeader] = useState(
    window.innerWidth > 700 ? true : false
  );
  const headerRef = useRef(null);

  const handleMenuBtn = (mode) => {
    handleMenuChange(mode);
    setActive(mode);
    headerRef.current.style.transitionDelay = "0.5s";
    if (window.innerWidth < 700) {
      setIsShowHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        setIsShowHeader(true);
      }
    });
  }, []);

  return (
    <div>
      <ul
        ref={headerRef}
        className={style.header}
        style={{
          left: isShowHeader ? 0 : "-100%",
        }}
      >
        <li
          onClick={() => {
            handleMenuBtn("mini_games");
          }}
          className={`${style.menuLi} ${
            active === "mini_games" ? style.selectedLi : ""
          }`}
        >
          Mini Games
        </li>
        <li
          onClick={() => {
            handleMenuBtn("latest_game");
          }}
          className={`${style.menuLi} ${
            active === "latest_game" ? style.selectedLi : ""
          }`}
        >
          Latest Game
        </li>
        <li
          onClick={() => {
            handleMenuBtn("art_games");
          }}
          className={`${style.menuLi} ${
            active === "art_games" ? style.selectedLi : ""
          }`}
        >
          Art Game
        </li>
      </ul>
      <div
        className={style.burgerMenu}
        onClick={() => {
          setIsShowHeader(!isShowHeader);
          headerRef.current.style.transitionDelay = "0s";
        }}
      >
        <CgMenuGridR />
      </div>
    </div>
  );
});

export default Header;
