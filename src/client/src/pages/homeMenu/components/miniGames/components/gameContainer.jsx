import React from "react";

import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { useState } from "react";

import style from "./gameContainer.module.css";
import ModalForComments from "./ModalForComments";
import HandleOutsideClick from "./HandleOutsideClick";

const GameContainer = () => {
  const [show, setShow] = useState(false)


  return (
    <div className={style.gameContainer}>
      <div
        className={
          style.gameBackgroundImage + " " + style["miniGameBackgroundImage-1"]
        }
      ></div>
      <p className={style.name}> Batumisken </p>
      <p className={style.shortDescription}>
        asiudhasiud asiudhasd asiudhasd asiud aisudhqiwudqwd iquwdh iudwd
        wudhqiud qiwudhwiud diwuw wuwd w wdwd dwd wdiuqwdh qiwudhqiwudhqiwduhqd
        qdwuhd iudhwiqudhqd iwuw wudhwd iuwhdiuwhdiqwuh qiwudhqiwud qiduqwiduhd
        diuwhdw wiudh diuwhdwqdqwuidhd q,dwoasidad
      </p>
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
            <FaCommentAlt onClick={() => setShow(true)}/>
          </li>
        </ul>
        <button className={style.openButton}> Open </button>
      </div>
      <HandleOutsideClick onClickOutside={() => setShow(false)}>
        <ModalForComments show={show}/>
      </HandleOutsideClick>
    </div>
  );
};

export default GameContainer;
