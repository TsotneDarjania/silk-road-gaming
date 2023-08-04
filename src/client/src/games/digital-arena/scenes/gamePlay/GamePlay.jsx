import React, { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import Board from "../../components/board/Board";
import GameContext from "../../context/gameContext";

import { MdReplayCircleFilled } from "react-icons/md";
import Modal from "../../components/modal/Modal";
import { Api } from "../../api";
import { getCookie } from "../../../../helper/cookie";

const api = new Api();
const userName = JSON.parse(getCookie("loginSession")).userName;

const GamePlay = () => {
  const gameContext = useContext(GameContext);

  const [timer, setTimer] = useState(100);
  const [stopTimer, setStopTimer] = useState(false);
  const [resetBoardIndex, setResetBoardIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer < 0) {
      if (stopTimer === false) gameOver();
    }
  }, [timer]);

  useEffect(() => {
    if (gameContext.inputFiledText > gameContext.targetNumberText) {
      gameOver();
    }
    if (gameContext.inputFiledText === gameContext.targetNumberText) {
      win();
    }
  }, [gameContext.inputFiledText]);

  useEffect(() => {
    const pressKeyEvent = (event) => {
      if (event.keyCode === 32) {
        setResetBoardIndex((prev) => prev + 1);
      }
    };

    document.addEventListener("keydown", pressKeyEvent);
    return () => {
      document.removeEventListener("keydown", pressKeyEvent);
    };
  }, []);

  const win = () => {
    api.insertNewRecord(userName, gameContext.targetNumberText);

    setModalTitle("You Win!");
    setModalText("New Record Is : " + gameContext.targetNumberText);
    setStopTimer(true);

    gameContext.setTargetNumberText((prev) => prev + 10);
  };

  const gameOver = () => {
    setModalTitle("You Lose!");
    setModalText("Your Record Is : " + Number(gameContext.targetNumberText));
    setStopTimer(true);
  };

  return (
    <div className={style.gamePlay}>
      <p className={style.inputFieldText}> {gameContext.inputFiledText}</p>
      <p className={style.targetNumberText}> {gameContext.targetNumberText}</p>
      <p className={style.timerText}> {stopTimer ? 0 : timer} </p>
      <div
        onClick={() => {
          setResetBoardIndex((prev) => prev + 1);
        }}
        className={style.replayBoardButton}
      >
        <MdReplayCircleFilled />
      </div>

      {stopTimer ? (
        <Modal
          setResetBoardIndex={setResetBoardIndex}
          setStopTimer={setStopTimer}
          setTimer={setTimer}
          record={1000}
          title={modalTitle}
          text={modalText}
        />
      ) : (
        <Board resetBoardIndex={resetBoardIndex} />
      )}
    </div>
  );
};

export default GamePlay;
