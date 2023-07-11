import React, { useContext, useState } from "react";
import PageContext from "../../context/PageContext";
import "../../global.css";

const PrimaryButton = ({ type, setPage }) => {
  const pageContext = useContext(PageContext);
  const [config] = useState({
    back: {
      text: "Back",
      onClick: () => {
        // pageContext.setRequestedPage("homeMenu")
        // pageContext.setIsShowTransitionAnimation(true)
        setPage("homeMenu")
        
      },
    },
    home: {
      text: "Home",
      onClick: () => {
        // pageContext.setRequestedPage("homePage")
        // pageContext.setIsShowTransitionAnimation(true)
        setPage("homePage")
      },
    },
  });

  return (
    <button
      onClick={() => {
        config[type].onClick();
      }}
      type="button"
      className="primaryButton"
    >
      {config[type].text}
    </button>
  );
};

export default PrimaryButton;
