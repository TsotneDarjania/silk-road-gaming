import React, { useState } from "react";
import style from "./artGameContainer.module.css";
import gamesInfo from "../../../../../data/gamesInfo.json";
import gameVideo from "../../../videos/1.mp4";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { BsFullscreen } from "react-icons/bs";
import ModalForComments from "../../../../../components/ModalForComments";
import SliderComponent from "../../../../../components/SliderComponent";
import image from "../../../images/background.jpg";

const ArtGameContainer = (props) => {
  const images = [image, image, image, image, image, image];

  return (
    <div className={style.artGameContainer}>
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
              window.open("http://localhost:3000" + gamesInfo.lastGame.url);
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
                <FaCommentAlt onClick={() => props.setShow(true)} />
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
        <div className={style.videoContainer}>
          <video className={style.gameVideo} loop autoPlay>
            <source src={gameVideo} type="video/mp4" />
          </video>
          <div
            className={`${style.fullScreenIcon}`}
            style={{
              right: props.active[props.videoId] === true ? "110px" : "90px",
            }}
          >
            <BsFullscreen
              onClick={() => props.handleFullScreen(props.videoId)}
            />
          </div>
        </div>
      </div>
      {/* {props.isShow && <ModalForComments show={props.show} />} */}
    </div>
  );
};

export default ArtGameContainer;
