import { useEffect, useState } from "react";
import style from "./latestGame.module.css";
import latestGameVideo from "../../videos/1.mp4";
import gamesInfo from "../../../../data/gamesInfo.json";
import AuthenticationModal from "../../../../components/autenticationModal/AuthenticationModal";

const LatestGame = ({ setIsLogin, isLogin }) => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);

  const [showShadow, setShowShadow] = useState(false);
  const shadowProperty = {
    opacity: 0.8,
    transition: "0.5s",
    show: showShadow,
    setShow: setShowShadow,
  };

  useEffect(() => {
    showShadow === false && setShowAutenticationModal(false);
  }, [showShadow]);

  return (
    <div
      className={style.latestGameContainer}
      id="latest_game_container"
      onTransitionEnd={(item) => {
        if (
          item.target.style.opacity === 0 &&
          item.target.id === "latest_game_container"
        ) {
          item.target.style.visibility = "hidden";
        }
      }}
    >
      {showAutenticationModal && (
        <AuthenticationModal
          setIsLogin={setIsLogin}
          accessAction={() => {
            window.open(`${window.location.href}${gamesInfo.lastGame.url}`);
            setShowShadow(false);
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
            if (isLogin) {
              window.open(`${window.location.href}${gamesInfo.lastGame.url}`);
            } else {
              setShowAutenticationModal(true);
              setShowShadow(true);
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
};

export default LatestGame;
