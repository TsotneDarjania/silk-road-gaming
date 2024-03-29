import React, { useState } from "react";
import style from "./latestGame.module.css";
import latestGameVideo from "../../videos/batumisken-video.mp4";
import gamesInfo from "../../../../data/gamesInfo.json";
import AuthenticationModal from "../../../../components/autenticationModal/AuthenticationModal";
import LinkButton from "../../../../components/buttons/LinkButton";

const LatestGame = React.memo(() => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);

  return (
    <div className={style.latestGameContainer}>
      {showAutenticationModal && (
        <AuthenticationModal
          accessAction={() => {
            window.open(
              `https://silk-road-gaming-3g2l.vercel.app/${gamesInfo.lastGame.url}`
            );
            setShowAutenticationModal(false);
          }}
          setShowAutenticationModal={setShowAutenticationModal}
        />
      )}
      <div className={style.latestGameContainerBackgroundImage}></div>
      <div className={style.content}>
        <div className={style.leftContainer}>
          <div className={style.leftContainer_Div}>
            <p>
              <span> Name : </span> {gamesInfo.lastGame.name}
            </p>
          </div>
          <div className={style.leftContainer_Div}>
            <p>
              <span> Publish Date : </span> {gamesInfo.lastGame.publishData}{" "}
            </p>
          </div>
          <div className={`${style.leftContainer_Div} ${style.descriptionDiv}`}>
            <p>
              <span> Short Description : </span>
              {gamesInfo.lastGame.shortDescription}
            </p>
          </div>
        </div>
        <div className={style.rightContainer}>
          <video className={style.lastGameVideo} autoPlay muted loop>
            <source src={latestGameVideo} type="video/mp4" />
          </video>
        </div>
        <div className={style.buttonDiv}>
          <LinkButton
            innerText="Play"
            gameUrl={gamesInfo.lastGame.url}
            setShowAutenticationModal={setShowAutenticationModal}
          />
        </div>
      </div>
    </div>
  );
});

export default LatestGame;
