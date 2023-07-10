import React, { useContext, useState } from "react";
import style from "./artGameContainer.module.css";
import gamesInfo from "../../../../../data/gamesInfo.json";
import gameVideo from "../../../videos/1.mp4";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import ModalForComments from "../../../../../components/commentsModal/ModalForComments";
import SliderComponent from "../../../../../components/Slider/SliderComponent";
import image from "../../../images/background.jpg";
import Warning from "../../../../../components/warning/Warning";
import "../../../../../global.css";
import PageContext from "../../../../../context/PageContext";
import AuthenticationModal from "../../../../../components/autenticationModal/AuthenticationModal";
import Indicators from "../../../components/Indicators";
import LinkButton from "../../../../../components/buttons/LinkButton";
import Leaderboard from "../../../../../components/leaderboard/Leaderboard";

const ArtGameContainer = (props) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const [showLeaderBoardModal, setShowLeaderBoardModal] = useState(false);
  const images = [image, image, image, image, image, image];

  const pageContext = useContext(PageContext);

  return (
    <div className={style.artGameContainer}>
      {showAutenticationModal && (
        <AuthenticationModal
          accessAction={() => {
            window.open(`${window.location.href}${props.data.url}`);
            setShowAutenticationModal(false);
          }}
          setShowAutenticationModal={setShowAutenticationModal}
        />
      )}
      {pageContext.warningProps.show && <Warning />}
      <div className={style.artGameContainerBgImage}></div>
      <div className={style.leftContainer}>
        <div className={style.leftContainer_Div}>
          <h3>
            <span className={style.title}> Name : </span> {props.name}
          </h3>
          <div className={style.descriptionDiv}>
            <h3>
              <span className={style.title}> Description : </span>
              {props.description}
            </h3>
          </div>
        </div>

        <div className={style.artGameGallery}>
          <SliderComponent images={images} />
        </div>

        <div className={style.buttonsDiv}>
          <LinkButton
            innerText="Play"
            gameUrl={gamesInfo.lastGame.url}
            setShowAutenticationModal={setShowAutenticationModal}
          />
          <Indicators
            gameName={props.name}
            setShowCommentsModal={setShowCommentsModal}
          >
            <MdLeaderboard onClick={() => setShowLeaderBoardModal(true)} />
          </Indicators>
        </div>
      </div>
      <div
        className={`${style.rightContainer} ${
          props.active[props.videoId] === true ? style.activeVideo : ""
        }`}
      >
        {props.active[props.videoId] === true && (
          <div
            className="shadow"
            onClick={() => props.handleFullScreen(props.videoId)}
          ></div>
        )}
        <div
          className={style.videoContainer}
          style={{
            width: props.active[props.videoId] === true && "50%",
          }}
        >
          <video
            className={style.gameVideo}
            loop
            autoPlay
            onClick={() => props.handleFullScreen(props.videoId)}
          >
            <source src={gameVideo} type="video/mp4" />
          </video>
          <div className={`${style.fullScreenIcon}`}>
            {props.active[props.videoId] === true ? (
              <AiOutlineFullscreenExit
                onClick={() => props.handleFullScreen(props.videoId)}
              />
            ) : (
              <AiOutlineFullscreen
                onClick={() => props.handleFullScreen(props.videoId)}
              />
            )}
          </div>
        </div>
      </div>
      {showCommentsModal && (
        <ModalForComments
          setShowCommentsModal={setShowCommentsModal}
          gameName={props.name}
        />
      )}
      {showLeaderBoardModal && (
        <Leaderboard setShowLeaderBoardModal={setShowLeaderBoardModal} />
      )}
    </div>
  );
};

export default ArtGameContainer;
