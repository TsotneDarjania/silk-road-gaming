import React, { useContext } from "react";
import "../../global.css";
import UserContext from "../../context/UserContext";

const LinkButton = ({ innerText, gameUrl, setShowAutenticationModal }) => {
  const userContext = useContext(UserContext);

  return (
    <button
      onClick={() => {
        if (userContext.isLogin) {
          window.open(`https://silk-road-gaming-3g2l.vercel.app/${gameUrl}`);
        } else {
          setShowAutenticationModal(true);
        }
      }}
      className="playButton"
    >
      {innerText}
    </button>
  );
};

export default LinkButton;
