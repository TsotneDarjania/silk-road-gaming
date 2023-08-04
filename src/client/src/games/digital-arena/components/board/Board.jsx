import React, { createRef, useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import Player from "../player/Player";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { getRandomFloat } from "../../../tbilisi-batumi-1/helper/tatukaMath";

const Board = ({ resetBoardIndex }) => {
  const [boardItems, setBoardItems] = useState(null);
  const [boarItemsData, setBoardItemsData] = useState(null);
  const [playerDirection, setPlayerDirection] = useState(null);
  const [playerMove, setPlayerMove] = useState(0);

  useEffect(() => {
    generateItems();
  }, [resetBoardIndex]);

  useEffect(() => {
    if (boardItems === null) return;
    const data = {};
    boardItems.forEach((item, index) => {
      const className = item.ref.current.className;
      data[index] = {
        x: item.ref.current.offsetLeft,
        y: item.ref.current.offsetTop,
        value: item.ref.current.innerHTML,
        operator: className.includes("plus") ? "plus" : "minus",
      };
    });
    setBoardItemsData(data);
  }, [boardItems]);

  const generateItems = () => {
    const itemsElementsArray = [];

    for (let i = 0; i < 50; i++) {
      const boardItemOptions = [Math.floor(getRandomFloat(0, 100))];

      const ref = createRef();
      const className = boardItemOptions[0] > 50 ? style.plus : style.minus;
      const itemElement = (
        <div
          ref={ref}
          className={style.boardItem + " " + className}
          key={"item" + i}
        >
          {
            boardItemOptions[
              Math.floor(getRandomFloat(0, boardItemOptions.length))
            ]
          }
        </div>
      );
      itemsElementsArray.push(itemElement);
    }

    setBoardItems(itemsElementsArray);
  };

  return (
    <div className={style.board}>
      {boardItems}
      {boarItemsData !== null && (
        <Player
          playerDirection={playerDirection}
          playerMove={playerMove}
          boardItemsData={boarItemsData}
        />
      )}
      <div className={style.mobileController}>
        <div
          onClick={() => {
            setPlayerDirection("ArrowRight");
            setPlayerMove((prev) => prev + 1);
          }}
          className={style.rightButton}
        >
          <BsFillArrowRightSquareFill />
        </div>
        <div
          onClick={() => {
            setPlayerDirection("ArrowLeft");
            setPlayerMove((prev) => prev + 1);
          }}
          className={style.leftButton}
        >
          <BsFillArrowRightSquareFill />
        </div>
        <div
          onClick={() => {
            setPlayerDirection("ArrowDown");
            setPlayerMove((prev) => prev + 1);
          }}
          className={style.bottomButton}
        >
          <BsFillArrowRightSquareFill />
        </div>
        <div
          onClick={() => {
            setPlayerDirection("ArrowUp");
            setPlayerMove((prev) => prev + 1);
          }}
          className={style.topButton}
        >
          <BsFillArrowRightSquareFill />
        </div>
      </div>
    </div>
  );
};

export default Board;
