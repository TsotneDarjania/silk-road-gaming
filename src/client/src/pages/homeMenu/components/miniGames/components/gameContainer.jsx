import { useContext, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

import style from "./gameContainer.module.css";
import ModalForComments from "../../../../../components/ModalForComments";
import AuthenticationModal from "../../../../../components/autenticationModal/AuthenticationModal";
import UserContext from "../../../../../context/UserContext";

const GameContainer = (props) => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const userContext = useContext(UserContext);

  return (
    <div className={style.gameContainer}>
      {showAutenticationModal && (
        <AuthenticationModal
          accessAction={() => {
            window.open(`${window.location.href}${props.data.url}`);
            setShowAutenticationModal(false);
          }}
          setShowAutenticationModal={setShowAutenticationModal}
        />
      )}
      <div
        className={
          style.gameBackgroundImage + " " + style["miniGameBackgroundImage-1"]
        }
      ></div>
      <p className={style.name}> {props.data.name} </p>
      <p className={style.shortDescription}>{props.data.description}</p>
      <div className={style.indicators}>
        <ul>
          <li className={style.likeIcon}>
            <AiFillLike /> <span className={style.number}> 0 </span>
          </li>

          <li className={style.deslikeIcon}>
            <span className={style.number}> 0 </span>
            <AiFillLike />
          </li>

          <li className={style.commentIcon}>
            <FaCommentAlt
              onClick={() => {
                if (userContext.isLogin) {
                  setShowCommentsModal(true);
                } else {
                  props.setShowWarning(true);
                  props.setShowWarningText(
                    "Please login or register before commenting"
                  )
                }
              }}
            />
          </li>
        </ul>
        <button
          onClick={() => {
            if (userContext.isLogin) {
              window.open(`${window.location.href}${props.data.url}`);
            } else {
              setShowAutenticationModal(true);
            }
          }}
          className={style.openButton}
        >
          Open
        </button>
      </div>
      {showCommentsModal && (
        <ModalForComments
          gameName={props.data.name}
          setShowCommentsModal={setShowCommentsModal}
        />
      )}
    </div>
  );
};

export default GameContainer;
