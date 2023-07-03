import React, { useContext } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import UserContext from "../../../context/UserContext";
import PageContext from "../../../context/PageContext";
import style from "./indicators.module.css";

const Indicators = ({ children, setShowCommentsModal }) => {
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);
  return (
    <div className={style.indicators}>
      <ul>
        <li className={style.likeIcon}>
          <AiFillLike /> <span className={style.number}> 0 </span>
        </li>

        <li className={style.dislikeIcon}>
          <AiFillDislike />
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

        <li>{children}</li>
      </ul>
    </div>
  );
};

export default Indicators;
