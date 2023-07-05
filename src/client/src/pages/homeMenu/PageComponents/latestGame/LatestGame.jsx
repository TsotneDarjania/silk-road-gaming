import React, { useState } from "react";
import style from "./latestGame.module.css";
import latestGameVideo from "../../videos/1.mp4";
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
            window.open(`${window.location.href}${gamesInfo.lastGame.url}`);
            setShowAutenticationModal(false);
          }}
          setShowAutenticationModal={setShowAutenticationModal}
        />
      )}
      <div className={style.latestGameContainerBackgroundImage}></div>
      <div className={style.content}>
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
          <div className={`${style.leftContainer_Div} ${style.descriptionDiv}`}>
            <h3>
              <span> Short Description : </span>
              {/* {gamesInfo.lastGame.shortDescription} */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
              quos, sunt aliquam consectetur numquam sequi, tempore similique ea
              perspiciatis dicta optio ex odit minima voluptatem excepturi odio
              nobis deleniti harum!
            </h3>
          </div>
        </div>
        <div className={style.rightContainer}>
          <video className={style.lastGameVideo} loop autoPlay>
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
