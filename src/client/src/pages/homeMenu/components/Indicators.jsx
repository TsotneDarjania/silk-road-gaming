import React, { useContext, useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import UserContext from "../../../context/UserContext";
import PageContext from "../../../context/PageContext";
import style from "./indicators.module.css";
import { Api } from "../../../api/api";

const api = new Api();

const Indicators = React.memo(
  ({ children, setShowCommentsModal, gameName }) => {
    const userContext = useContext(UserContext);
    const pageContext = useContext(PageContext);

    const [likeNumber, setLikeNumber] = useState(0);
    const [deslikeNumber, setDeslikeNumber] = useState(0);

    useEffect(() => {
      api.getUsersReactions(gameName, "like").then(
        (response) => {
          setLikeNumber(response.total);
        },
        (error) => {
          console.log(error);
        }
      );

      api.getUsersReactions(gameName, "deslike").then(
        (response) => {
          setDeslikeNumber(response.total);
        },
        (error) => {
          console.log(error);
        }
      );
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
                  "like"
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
                  "deslike"
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

          <li>{children}</li>
        </ul>
      </div>
    );
  }
);

export default Indicators;
