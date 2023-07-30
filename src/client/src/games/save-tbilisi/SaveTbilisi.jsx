import { useState } from "react";
import style from "./style.module.css";
import { Menu } from "./scenes/menu/Menu";
import GamePlay from "./scenes/menu/gamePlay/GamePlay";

export const SaveTbilisi = () => {
  const [scene, setScene] = useState("GamePlay");

  return (
    <div className={style.game}>
      {scene === "Menu" && <Menu />}
      {scene === "GamePlay" && <GamePlay />}
    </div>
  );
};
