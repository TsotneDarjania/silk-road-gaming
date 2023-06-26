import React, { useState, useEffect } from "react";
import style from "./artGames.module.css";
import ArtGameContainer from "./components/ArtGameContainer";
import Shadow from "../../../../components/Shadow";
import artGameInfo from "../../../../data/artgames.json";
import Scroll from "./components/Scroll";

const ArtGames = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState([false, false]);
  const [showShadow, setShowShadow] = useState(false);
  const [showLeader, setShowLeader] = useState(false);

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
  }, [showShadow, show, showLeader]);

  const shadowProperty = {
    opacity: 0.5,
    transition: "0.5s",
    show: show || showShadow || showLeader,
    setShow:
      showShadow === true
        ? setShowShadow
        : showLeader
        ? setShowLeader
        : setShow,
  };

  return (
    <div
      className={style.artGames}
      id="art_games_container"
      onTransitionEnd={(item) => {
        if (
          item.target.style.opacity === "0" &&
          item.target.id === "art_games_container"
        ) {
          item.target.style.visibility = "hidden";
        }
      }}
    >
      <div className={style.artGamesDiv}>
        <Shadow props={shadowProperty} />
        {artGameInfo.map((item, index) => (
          <ArtGameContainer
            key={index}
            show={show}
            setShow={setShow}
            active={active}
            handleFullScreen={handleFullScreen}
            videoId={index}
            setShowShadow={setShowShadow}
            showShadow={showShadow}
            name={item.name}
            description={item.description}
            showLeader={showLeader}
            setShowLeader={setShowLeader}
          />
        ))}
      </div>
      <div className={style.scroll_div}>
        <Scroll />
      </div>
    </div>
  );
};

export default ArtGames;
