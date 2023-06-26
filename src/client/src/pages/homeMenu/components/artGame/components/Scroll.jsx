import React from "react";
import style from './scroll.module.css'

const Scroll = () => {
  return (
    <div className={style.scroll_wrapper}>
        <div className={style.scroll_title}>Scroll</div>
        <div className={style.scroll_down}></div>
    </div>
  );
};

export default Scroll;
