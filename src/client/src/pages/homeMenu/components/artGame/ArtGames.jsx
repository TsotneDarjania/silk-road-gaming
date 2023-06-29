import React, { useState } from "react";
import style from "./artGames.module.css";
import ArtGameContainer from "./components/ArtGameContainer";
import artGameInfo from "../../../../data/artgames.json";

const ArtGames = React.memo(() => {
  const [active, setActive] = useState([false, false]);

  const handleFullScreen = (videoId) => {
    setActive((active) => {
      return active.map((value, i) => {
        return i === videoId ? !value : value;
      });
    });
  };

  return (
    <div
      className={style.artGames}
      id="art_games_container"
      onTransitionEnd={(item) => {
        if (
          item.target.style.opacity == 0 &&
          item.target.id === "art_games_container"
        ) {
          item.target.style.visibility = "hidden";
        }
      }}
    >
      {artGameInfo.map((item, index) => (
        <ArtGameContainer
          key={index}
          active={active}
          handleFullScreen={handleFullScreen}
          videoId={index}
          name={item.name}
          description={item.description}
        />
      ))}
      {console.log("artgames")}
    </div>
  );
});

export default ArtGames;
