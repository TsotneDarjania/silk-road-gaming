import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

import style from "./gameContainer.module.css";
import ModalForComments from "../../../../../components/ModalForComments";
import AuthenticationModal from "../../../../../components/autenticationModal/AuthenticationModal";
import Shadow from "../../../../../components/Shadow";

const GameContainer = (props) => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const shadowProperty = {
    opacity: 0.8,
    transition: "0.5s",
    show: showShadow,
    setShow: setShowShadow,
  };
  const [isOpenShadow, setIsOpenShadow] = useState(false);
  const [shadow, reRenderShadow] = useState(
    props.shadow(false, setIsOpenShadow)
  );
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  useEffect(() => {
    isOpenShadow === false && reRenderShadow(() => props.shadow(false, setIsOpenShadow))
    showShadow === false && setShowAutenticationModal(false);
    props.show === false && setShowCommentsModal(false);
  }, [showShadow, props.show, isOpenShadow]);

  return (
    <div className={style.gameContainer}>
      {showAutenticationModal && (
        <AuthenticationModal
          setIsLogin={props.setIsLogin}
          accessAction={() => {
            window.open(`${window.location.href}${props.data.url}`);
            setShowShadow(false);
            setShowAutenticationModal(false);
          }}
        />
      )}
      {shadow}
      {console.log("game container")}
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
                if (props.isLogin) {
                  reRenderShadow(() => props.shadow(true, setIsOpenShadow));
                  setIsOpenShadow(true)
                  // props.setShow(true);
                  // setShowCommentsModal(true);
                } else {
                  props.setShowWarning(true);
                  props.setShowWarningText(
                    "Please login or register before commenting"
                  );
                }
              }}
            />
          </li>
        </ul>
        <button
          onClick={() => {
            if (props.isLogin) {
              window.open(`${window.location.href}${props.data.url}`);
            } else {
              setShowAutenticationModal(true);
              setShowShadow(true);
            }
          }}
          className={style.openButton}
        >
          Open
        </button>
      </div>
      {showCommentsModal && <ModalForComments gameName={props.data.name} />}
    </div>
  );
};

export default GameContainer;
