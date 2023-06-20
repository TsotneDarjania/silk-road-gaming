import React from "react";
import style from "./latestGame.module.css";
import latestGameVideo from "../../videos/1.mp4";
import gamesInfo from "../../../../data/gamesInfo.json";

const LatestGame = () => {
  return (
    <div className={style.latestGameContainer}>
      <div className={style.latestGameContainerBackgroundImage}></div>
      <div className={style.leftContainer}>
        <div className={style.leftContainer_Div}>
          <h3>
            <span> Name : </span> {gamesInfo.lastGame.name}
          </h3>
        </div>
        <div className={style.leftContainer_Div}>
          <h3>
            <span> Publish Date : </span> {gamesInfo.lastGame.publishData}{" "}
          </h3>
        </div>
        <div className={style.leftContainer_Div}>
          <h3>
            <span> Short Description : </span>
            {gamesInfo.lastGame.shortDescription}
          </h3>
        </div>
        <button
          onClick={() => {
            window.open(gamesInfo.lastGame.url);
          }}
          className={style.playButton}
        >
          Play
        </button>
      </div>
      <div className={style.rightContainer}>
        <video className={style.lastGameVideo} loop autoPlay>
          <source src={latestGameVideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default LatestGame;
