import React, { useContext, useState } from "react";
import style from "./artGameContainer.module.css";
import gamesInfo from "../../../../../data/gamesInfo.json";
import gameVideo from "../../../videos/1.mp4";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import ModalForComments from "../../../../../components/ModalForComments";
import SliderComponent from "../../../../../components/SliderComponent";
import image from "../../../images/background.jpg";
import Warning from "../../../../../components/Warning";
import "../../../../../global.css";
import UserContext from "../../../../../context/UserContext";
import PageContext from "../../../../../context/PageContext";
import AuthenticationModal from "../../../../../components/autenticationModal/AuthenticationModal";

const ArtGameContainer = (props) => {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const images = [image, image, image, image, image, image];

  const userContext = useContext(UserContext);
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
            <span> Name : </span> {props.name}
          </h3>
          <div
            className={
              props.description.length >= 400 ? style.descriptionDiv : ""
            }
          >
            <h3>
              <span> Description : </span>
              {props.description}
            </h3>
          </div>
        </div>

        <div className={style.artGameGallery}>
          <SliderComponent images={images} />
        </div>

        <div className={style.buttonsDiv}>
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
          <div className={style.indicators}>
            <ul>
              <li className={style.likeIcon}>
                <AiFillLike /> <span className={style.number}> 0 </span>
              </li>

              <li>
                <div className={style.dislikeIcon}>
                  <AiFillDislike />
                </div>
                <span className={style.number}> 0 </span>
              </li>

              <li className={style.commentIcon}>
                <FaCommentAlt
                  onClick={() => {
                    if (userContext.isLogin) {
                      setShowCommentsModal(true);
                    } else {
                      pageContext.setWarningProps({
                        text: "Please login or register before commenting",
                        show: true,
                      });
                    }
                  }}
                />
              </li>

              <li>
                <MdLeaderboard />
              </li>
            </ul>
          </div>
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
        <ModalForComments setShowCommentsModal={setShowCommentsModal} />
      )}
    </div>
  );
};

export default ArtGameContainer;
