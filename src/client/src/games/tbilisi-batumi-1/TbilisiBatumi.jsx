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

export const TbilisiBatumi = () => {
  const canvasContainer = useRef(null);
  const [isPortrait, setIsPortrait] = useState(false);

  const isLandscapeOrientation = () => {
    if (window.screen.height > window.screen.width) {
      return false;
    } else {
      return true;
    }
  };

  window
    .matchMedia("(orientation: portrait)")
    .addEventListener("change", (e) => {
      const portrait = e.matches;

      if (portrait) {
        setIsPortrait(true);
      } else {
        setIsPortrait(false);
      }
    });

  const hideWidth = window.outerWidth - window.innerWidth;
  const hideHeight = window.outerHeight - window.innerHeight;

  const canvasWidth = isLandscapeOrientation()
    ? window.outerWidth - hideWidth
    : window.outerHeight - hideHeight;

  const canvasHeight = isLandscapeOrientation()
    ? window.outerHeight - hideHeight
    : window.outerWidth - hideWidth;

  useEffect(() => {
    if (!canvasContainer.current) return;

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
      fullscreenTarget: canvasContainer.current,
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

  return (
    <div ref={canvasContainer} className={style.canvas}>
      {isPortrait ? (
        <div className={style.orientationWarning}>
          <h1>please rotate your device to landscape </h1>
        </div>
      ) : null}
    </div>
  );
};
