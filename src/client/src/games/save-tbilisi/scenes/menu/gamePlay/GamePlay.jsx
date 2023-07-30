import React from "react";
import style from "./style.module.css";

import image_1 from "../../../assets/images/streets/1.jpg";
import image_2 from "../../../assets/images/streets/gift.png";

const GamePlay = () => {
  return (
    <div className={style.gamePlay}>
      <img src={image_1} alt="main image" className={style.screenImage} />
      <img src={image_2} alt="gift" className={style.gift} />
    </div>
  );
};

export default GamePlay;
