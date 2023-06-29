import React, { useState } from "react";
import style from "./artGames.module.css";
import ArtGameContainer from "./components/ArtGameContainer";
import gameInfo from "../../../../data/gamesInfo.json";

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
    <div className={style.artGames}>
      {gameInfo.artGames.map((item, index) => (
        <ArtGameContainer
          key={index}
          active={active}
          handleFullScreen={handleFullScreen}
          videoId={index}
          name={item.name}
          description={item.description}
        />
      ))}
    </div>
  );
});

export default ArtGames;
