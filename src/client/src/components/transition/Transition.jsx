import React, { useState } from "react";
import style from "./transition.module.css";

const TransitionAnimation = ({
  setTransitionPlayAnimation,
  transitionAnimationAction,
}) => {
  const [animationEnd, setAnimationEnd] = useState(false);

  return (
    <div className={style.transition}>
      <div
        onAnimationEnd={() => {
          setAnimationEnd(true);
          !animationEnd && transitionAnimationAction();
          animationEnd && setTransitionPlayAnimation(false);
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
