import React, { useEffect, useRef, useContext } from "react";
import Phaser from "phaser";

import style from "./intro.module.css";
import { Home } from "../intro/scenes/home";
import PageContext from "../../context/PageContext";

export const Intro = () => {
  const canvasContainer = useRef(null);
  const pageContext = useContext(PageContext)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!canvasContainer.current) return;
    const game = new Phaser.Game({
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
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#19053B",
      transparent: true,
      scene: [Home],
    });

    return () => {
      game.destroy(true, false);
    };
  }, [canvasContainer]);

  return (
    <div className={style.intro}>
      <div ref={canvasContainer} className={style.canvas}></div>
      <button
        onClick={() => {
          pageContext.setRequestedPage("homeMenu")
          pageContext.setIsShowTransitionAnimation(true)
        }}
        className={style.openButton}
      >
        Open
      </button>
    </div>
  );
};
