import React, { useState, useRef } from "react";
import style from "./artGames.module.css";
import ArtGameContainer from "./components/ArtGameContainer";
import gameInfo from "../../../../data/gamesInfo.json";
import Scroll from "../../../../components/scroll/Scroll";

const ArtGames = React.memo(() => {
  const [active, setActive] = useState([false, false]);
  const ref = useRef(null)

  const handleFullScreen = (videoId) => {
    setActive((active) => {
      return active.map((value, i) => {
        return i === videoId ? !value : value;
      });
    });
  };

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }

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
      <div className={style.scrollDiv} onClick={handleClick}>
        <Scroll/>
      </div>
      <div ref={ref} style={{color: 'white'}}>
        some text here
      </div>
    </div>
  );
});

export default ArtGames;
