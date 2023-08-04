import React from "react";
import style from "./style.module.css";

const Menu = ({ setScene }) => {
  return (
    <div className={style.menu}>
      <h1 className={style.title}> Digital Arena</h1>
      <p className={style.text}>
        Indulge in the joy of our captivating and addictive game. Your mission
        is simple: reach the target number and engage your brain in the digital
        arena. Prepare for endless entertainment and exciting challenges that
        will keep you hooked for hours!
      </p>
      <button
        onClick={() => setScene("gamePlay")}
        className={style.startButton}
      >
        Start
      </button>
    </div>
  );
};

export default Menu;
