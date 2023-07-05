import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import style from "./style.module.css";

import { Preload } from "./scenes/preload";
import { GamePlay } from "./scenes/gamePlay";

export const LoveChaser = () => {
  const canvasContainer = useRef(null);

  useEffect(() => {
    if (!canvasContainer.current) return;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "arcade",
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 700,
        height: 700,
      },

      backgroundColor: 0x19053b,
      scene: [Preload, GamePlay],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvas}></div>;
};
