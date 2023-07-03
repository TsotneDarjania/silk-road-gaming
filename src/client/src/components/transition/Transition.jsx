import React, { useState, useContext } from "react";
import style from "./transition.module.css";
import PageContext from "../../context/PageContext";

const TransitionAnimation = ({
  transitionAnimationAction,
}) => {
  const [animationEnd, setAnimationEnd] = useState(false);

  const pageContext = useContext(PageContext)

  return (
    <div className={style.transition}>
      <div
        onAnimationEnd={() => {
          setAnimationEnd(true);
          !animationEnd && transitionAnimationAction();
          animationEnd && pageContext.setIsShowTransitionAnimation(false);
        }}
        className={animationEnd ? style.topAnimationUp : style.topTransition}
      ></div>
      <div
        onAnimationEnd={() => {
          setAnimationEnd(true);
        }}
        className={
          animationEnd ? style.bottomAnimationDown : style.bottomTransition
        }
      ></div>
    </div>
  );
};

export default TransitionAnimation;
