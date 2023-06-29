import React, { useContext, useState } from "react";
import style from "./latestGame.module.css";
import latestGameVideo from "../../videos/1.mp4";
import gamesInfo from "../../../../data/gamesInfo.json";
import AuthenticationModal from "../../../../components/autenticationModal/AuthenticationModal";
import UserContext from "../../../../context/UserContext";

const LatestGame = React.memo(() => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const userContext = useContext(UserContext);

  return (
    <div className={style.latestGameContainer}>
      {showAutenticationModal && (
        <AuthenticationModal
          accessAction={() => {
            window.open(`${window.location.href}${gamesInfo.lastGame.url}`);
            setShowAutenticationModal(false);
          }}
          setShowAutenticationModal={setShowAutenticationModal}
        />
      )}
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
            if (userContext.isLogin) {
              window.open(`${window.location.href}${gamesInfo.lastGame.url}`);
            } else {
              setShowAutenticationModal(true);
            }
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
});

export default LatestGame;
