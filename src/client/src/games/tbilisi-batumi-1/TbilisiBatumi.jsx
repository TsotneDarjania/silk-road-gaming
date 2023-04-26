import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Preload } from "./scenes/preload";
import { GamePlay } from "./scenes/gamePlay";

import style from "./style.module.css";
import { GameMenu } from "./ui/menu/gameMenu";

import "pathseg";
import "./helper/WebFontLoader";
import { StartScene } from "./scenes/start";
import { Menu } from "./scenes/menu";
import { Boot } from "./scenes/boot";

import { screenSize } from "./config/getScreenSize";
import responsiveData from "./config/layoutConfig.json";

export const TbilisiBatumi = () => {
  const canvasContainer = useRef(null);
  const size = useRef(20);

  useEffect(() => {
    if (!canvasContainer.current) return;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "matter",
        matter: {
          debug: false,
          gravity: {
            y: 0.27,
          },
        },
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // width: responsiveData[screenSize()].canvas.width,
        // height: responsiveData[screenSize()].canvas.height,
        width: window.innerWidth,
        height: window.innerHeight,
      },

      backgroundColor: 0x19053b,
      scene: [Boot, Menu, Preload, GamePlay, GameMenu, StartScene],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvas}></div>;
};
