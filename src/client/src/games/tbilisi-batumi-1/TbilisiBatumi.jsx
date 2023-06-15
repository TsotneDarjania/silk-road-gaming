import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Preload } from "./scenes/preload";
import { GamePlay } from "./scenes/gamePlay";

import style from "./style.module.css";
import { GameMenu } from "./ui/menu/gameMenu";

import "pathseg";
import "./helper/WebFontLoader";
import ScreenOrientation from "screen-orientation";

import { StartScene } from "./scenes/start";
import { Menu } from "./scenes/menu";
import { Boot } from "./scenes/boot";

export const TbilisiBatumi = () => {
  const canvasContainer = useRef(null);

  const isLandscapeOrientation = () => {
    if (window.screen.availHeight > window.screen.availWidth) {
      return false;
    } else {
      return true;
    }
  };

  const hideWidth = window.outerWidth - window.innerWidth;
  const hideHeight = window.outerHeight - window.innerHeight;

  const canvasWidth = isLandscapeOrientation()
    ? window.outerWidth
    : window.outerHeight;

  const canvasHeight = isLandscapeOrientation()
    ? window.outerHeight
    : window.outerWidth;

  useEffect(() => {
    if (!canvasContainer.current) return;

    // setCanvasWidth(window.outerWidth - hideWidth);
    // setCanvasHeight(window.outerHeight - hideHeight);

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "matter",
        matter: {
          debug: false,
          gravity: {
            y: 0.3,
          },
        },
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: canvasWidth,
        height: canvasHeight,
      },

      backgroundColor: 0x19053b,
      scene: [Boot, Menu, Preload, GamePlay, GameMenu, StartScene],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvas}></div>;
};
