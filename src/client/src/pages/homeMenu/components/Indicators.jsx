import React, { useContext, useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import UserContext from "../../../context/UserContext";
import PageContext from "../../../context/PageContext";
import style from "./indicators.module.css";
import { Api } from "../../../api/api";
import { MdLeaderboard } from "react-icons/md";

const api = new Api();

const Indicators = ({
  setShowCommentsModal,
  gameName,
  setShowLeaderBoardModal,
}) => {
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);

  const [likeNumber, setLikeNumber] = useState(0);
  const [deslikeNumber, setDeslikeNumber] = useState(0);

  const getReactions = () => {
    api.getUsersReactions(gameName, "like").then(
      (response) => {
        let likes = 0;
        response.documents.filter((doc) => {
          if (doc.gameName === gameName) {
            likes += 1;
          }
        });
        setLikeNumber(likes);
      },
      (error) => {
        console.log(error);
      }
    );

    api.getUsersReactions(gameName, "deslike").then(
      (response) => {
        let deslikes = 0;
        response.documents.filter((doc) => {
          if (doc.gameName === gameName) {
            deslikes += 1;
          }
        });
        setDeslikeNumber(deslikes);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getReactions();
  }, []);

  return (
    <div className={style.indicators}>
      <ul>
        <li
          onClick={() => {
            if (userContext.isLogin) {
              api.insertUserReactionForGame(
                userContext.userName,
                gameName,
                "like",
                getReactions
              );
            } else {
              pageContext.setWarningProps({
                text: "Please login or register before Like",
                show: true,
              });
            }
          }}
          className={style.likeIcon}
        >
          <AiFillLike /> <span className={style.number}> {likeNumber} </span>
        </li>

        <li
          onClick={() => {
            if (userContext.isLogin) {
              api.insertUserReactionForGame(
                userContext.userName,
                gameName,
                "deslike",
                getReactions
              );
            } else {
              pageContext.setWarningProps({
                text: "Please login or register before Deslike",
                show: true,
              });
            }
          }}
          className={style.dislikeIcon}
        >
          <AiFillDislike />
          <span className={style.number}> {deslikeNumber} </span>
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
          {/* <MdLeaderboard onClick={() => setShowLeaderBoardModal(true)}/> */}
        </li>
      </ul>
    </div>
  );
};

export default Indicators;
