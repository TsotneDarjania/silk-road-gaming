import React, { useState, useEffect, useContext } from "react";
import style from "./style.module.css";
import GameContext from "../../context/gameContext";

const Player = ({ playerDirection, playerMove, boardItemsData }) => {
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
      move(event.key);
    };

    document.addEventListener("keydown", pressKeyEvent);
    return () => {
      document.removeEventListener("keydown", pressKeyEvent);
    };
  }, [playerIsMoving]);

  useEffect(() => {
    move(playerDirection);
  }, [playerMove]);

  const move = (direction) => {
    const verticalStep = window.innerWidth >= 711 ? 10 : 5;
    switch (direction) {
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
        if (gameContext.playerPositionIndex - verticalStep >= 0) {
          setPlayerIsMoving(true);
          gameContext.setPlayerPositionIndex(
            (prevCount) => prevCount - verticalStep
          );
        }
        break;
      case "ArrowDown":
        if (gameContext.playerPositionIndex + verticalStep <= 49) {
          setPlayerIsMoving(true);
          gameContext.setPlayerPositionIndex(
            (prevCount) => prevCount + verticalStep
          );
        }
        break;
      default:
        break;
    }
  };

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
