import React, { useState, useEffect } from "react";
import style from "./artGames.module.css";
import ArtGameContainer from "./components/ArtGameContainer";
import Shadow from "../../../../components/Shadow";

const ArtGames = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState([false, false]);
  const [showShadow, setShowShadow] = useState(false);

  const handleFullScreen = (videoId) => {
    setShowShadow(!showShadow);
    setActive((active) => {
      return active.map((value, i) => {
        return i === videoId ? !value : value;
      });
    });
  };

  useEffect(() => {
    showShadow === false &&
      setActive((active) => {
        return active.map((value) => {
          return (value = false);
        });
      });
  }, [showShadow]);
  
  const shadowProperty = {
    opacity: 0.5,
    transition: "0.5s",
    show: showShadow || show,
    setShow: setShow || setShowShadow,
  };

  const artGameContainers = () => {
    const quantity = 5;
    
    const elements = Array.from({ length: quantity }, (_, i) => (
      <ArtGameContainer
        key={i}
        show={show}
        setShow={setShow}
        active={active}
        handleFullScreen={handleFullScreen}
        videoId={i}
        setShowShadow={setShowShadow}
      />
    ));
  
    return elements;
  };

  return (
    <div className={style.artGames}>
      <Shadow props={shadowProperty} />
      {artGameContainers()}
    </div>
  );
};

export default ArtGames;
