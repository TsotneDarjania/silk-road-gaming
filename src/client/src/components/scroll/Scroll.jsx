import React from "react";
import style from "./scroll.module.css";

const Scroll = () => {
  return (
      <div className={style.scrollWrapper}>
        <div className={style.scrollTitle}>
          Scroll
        </div>
        <div className={style.scrollDown}></div>
      </div>
  );
};

export default Scroll;
