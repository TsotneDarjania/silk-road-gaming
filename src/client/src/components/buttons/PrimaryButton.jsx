import React, { useContext, useState } from "react";
import PageContext from "../../context/PageContext";
import "../../global.css";

const PrimaryButton = ({ type }) => {
  const pageContext = useContext(PageContext);
  const [config] = useState({
    back: {
      className: "primaryButton",
      text: "Back",
      onClick: () => {
        pageContext.setRequestedPage("homeMenu")
        pageContext.setIsShowTransitionAnimation(true)
      },
    },
    home: {
      className: "primaryButton",
      text: "Home",
      onClick: () => {
        pageContext.setRequestedPage("homePage")
        pageContext.setIsShowTransitionAnimation(true)
      },
    },
  });

  return (
    <button
      onClick={() => {
        config[type].onClick();
      }}
      type="button"
      className={config[type].className}
    >
      {config[type].text}
    </button>
  );
};

export default PrimaryButton;
