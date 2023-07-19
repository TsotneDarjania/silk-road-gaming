import React, { useEffect, useState } from "react";
import style from "./background.module.css";
import Item from "./components/Item";
import { getRandomFloat } from "../../../games/tbilisi-batumi-1/helper/tatukaMath";

const Background = React.memo(({ images }) => {
  const [getItems, setGetItems] = useState(null);

  useEffect(() => {
    setGetItems(() => {
      const length = (window.innerWidth / 100) * 2;
      const items = [];
      let imagesIndex = 0

      for (let i = 0; i < length; i++) {
        const animationDelay = getRandomFloat(i, i + 2);
        const item = (
          <Item
            image={images[imagesIndex]}
            key={`item${i}`}
            left={getRandomFloat(0, window.innerWidth)}
            animationDelay={animationDelay}
          />
        );
        items.push(item);
        imagesIndex = imagesIndex >= images.length - 1 ? 0 : imagesIndex + 1
      }
      console.log("get items");
      return items;
    });
  }, []);

  return <div className={style.backgroundContainer}>{getItems}</div>;
});

export default Background;
