import React, { useContext } from "react";
import style from "./style.module.css";
import { MdReplayCircleFilled } from "react-icons/md";
import GameContext from "../../context/gameContext";

const Modal = ({ title, text, setResetBoardIndex, setStopTimer, setTimer }) => {
  const gameContext = useContext(GameContext);

  return (
    <div className={style.modal}>
      <div className={style.shadow}></div>
      <div className={style.content}>
        <h1 className={style.title}>{title}</h1>
        <p className={style.text}> {text}</p>

        <div
          onClick={() => {
            setTimer(100);
            setStopTimer(false);
            gameContext.setInputFiledText(0);
            gameContext.setPlayerPositionIndex(0);
            setResetBoardIndex((prev) => prev + 1);
          }}
          className={style.replayBoardButton}
        >
          <MdReplayCircleFilled />
        </div>
      </div>
    </div>
  );
};

export default Modal;
