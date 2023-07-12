import { useEffect, useRef } from "react";
import Phaser from "phaser";
import style from "./style.module.css";

import { Preload } from "./scenes/preload";
import { GamePlay } from "./scenes/gamePlay";
import { Menu } from "./scenes/menu";

import "../common/WebFontLoader";

export const LoveChaser = () => {
  const canvasContainer = useRef(null);

  useEffect(() => {
    if (!canvasContainer.current) return;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
      },

      backgroundColor: 0x62768a,
      scene: [Preload, Menu, GamePlay],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvas}></div>;
};
