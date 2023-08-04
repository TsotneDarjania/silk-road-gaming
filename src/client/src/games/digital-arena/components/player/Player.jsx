import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.css";
import GameContext from "../../context/gameContext";

const Player = ({ boardItemsData }) => {
  const gameContext = useContext(GameContext);

  const [playerIsMoving, setPlayerIsMoving] = useState(false);

  useEffect(() => {
    const positiveValue =
      Number(gameContext.inputFiledText) +
      Number(boardItemsData[gameContext.playerPositionIndex].value);

    const negativeValue =
      Number(gameContext.inputFiledText) -
      Number(boardItemsData[gameContext.playerPositionIndex].value);

    gameContext.setInputFiledText(
      boardItemsData[gameContext.playerPositionIndex].operator === "plus"
        ? positiveValue
        : negativeValue
    );
  }, [gameContext.playerPositionIndex]);

  useEffect(() => {
    const pressKeyEvent = (event) => {
      if (playerIsMoving) return;

      switch (event.key) {
        case "ArrowLeft":
          if (gameContext.playerPositionIndex !== 0) {
            setPlayerIsMoving(true);
            gameContext.setPlayerPositionIndex((prevCount) => prevCount - 1);
          }
          break;
        case "ArrowRight":
          if (gameContext.playerPositionIndex !== 49) {
            setPlayerIsMoving(true);
            gameContext.setPlayerPositionIndex((prevCount) => prevCount + 1);
          }
          break;
        case "ArrowUp":
          if (gameContext.playerPositionIndex - 10 >= 0) {
            setPlayerIsMoving(true);
            gameContext.setPlayerPositionIndex((prevCount) => prevCount - 10);
          }
          break;
        case "ArrowDown":
          if (gameContext.playerPositionIndex + 10 <= 49) {
            setPlayerIsMoving(true);
            gameContext.setPlayerPositionIndex((prevCount) => prevCount + 10);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", pressKeyEvent);
    return () => {
      document.removeEventListener("keydown", pressKeyEvent);
    };
  }, [playerIsMoving]);

  return (
    <div
      onTransitionEnd={(event) => {
        if (event.currentTarget.className.includes("player")) {
          setPlayerIsMoving(false);
        }
      }}
      style={{
        left: boardItemsData[gameContext.playerPositionIndex].x + 1,
        top: boardItemsData[gameContext.playerPositionIndex].y + 1,
      }}
      className={style.player}
    ></div>
  );
};

export default Player;
