import React from "react";
import style from "./artGameContainer.module.css";
import gamesInfo from "../../../../../data/gamesInfo.json";
import gameVideo from "../../../videos/1.mp4";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import {MdLeaderboard} from 'react-icons/md'
import ModalForComments from "../../../../../components/ModalForComments";

const ArtGameContainer = (props) => {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at dictum ex, vitae ullamcorper magna. Mauris sed ante blandit, commodo sapien non, bibendum neque. Integer pellentesque sit amet purus non lobortis. Phasellus dui risus, ultrices eget lectus vitae, tristique viverra elit. Nunc gravida varius diam at lacinia. Nulla luctus tristique elit, eu bibendum nibh sollicitudin sed. Praesent sed rhoncus purus.";
  console.log(description.length);

  return (
    <div className={style.artGameContainer}>
      <div className={style.artGameContainerBgImage}></div>
      <div className={style.leftContainer}>
        <div className={style.leftContainer_Div}>
          <h3>
            <span> Name : </span> {gamesInfo.lastGame.name}
          </h3>
        </div>
        <div
          className={`${style.leftContainer_Div} ${
            description.length >= 400 ? style.descriptionDiv : ""
          }`}
        >
          <h3>
            <span> Description : </span>
            {description}
          </h3>
        </div>
        <div className={style.artGameGallery}></div>          
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
            <div className={style.dislikeIcon}><AiFillDislike /></div>
            <span className={style.number}> 0 </span>
          </li>

          <li className={style.commentIcon}>
            <FaCommentAlt onClick={() => props.setShow(true)}/>
          </li>

          <li>
            <MdLeaderboard/>
          </li>
        </ul>
      </div>
      </div>
      <div className={style.rightContainer}>
        <video className={style.gameVideo} loop autoPlay>
          <source src={gameVideo} type="video/mp4" />
        </video>
      </div>
      <ModalForComments show={props.show}/>
    </div>
  );
};

export default ArtGameContainer;
