import React, { useState, useContext, useEffect } from "react";
import GamePlay from "./scenes/gamePlay/GamePlay";
import GameContext from "./context/gameContext";
import { Api } from "./api";
import { getCookie } from "../../helper/cookie";
import Menu from "./scenes/menu/Menu";

const api = new Api();

const DigitalArena = () => {
  const gameContext = useContext(GameContext);

  const [scene, setScene] = useState("menu");

  const [inputFieldText, setInputFieldText] = useState("");
  const [targetNumberText, setTargetNumberText] = useState(0);
  const [playerPositionIndex, setPlayerPositionIndex] = useState(0);

  useEffect(() => {
    let userName = "";
    if (getCookie("loginSession").length > 3) {
      userName = JSON.parse(getCookie("loginSession")).userName;
      api.initUser(userName).then(
        (res) => {
          inigGame(userName);
        },
        (err) => {
          if (err.code === 409) {
            inigGame(userName);
          }
          console.log(err);
        }
      );
    } else {
      window.location = "../../";
    }
  }, []);

  const inigGame = (userName) => {
    api.initGame(userName).then((res) => {
      setTargetNumberText(res.record + 10);
      setScene("menu");
    });
  };

  return (
    <GameContext.Provider
      value={{
        playerPositionIndex,
        setPlayerPositionIndex,
        inputFiledText: inputFieldText,
        setInputFiledText: setInputFieldText,
        targetNumberText,
        setTargetNumberText,
      }}
    >
      <div>{scene === "gamePlay" && <GamePlay />}</div>;
      <div>{scene === "menu" && <Menu setScene={setScene} />}</div>;
    </GameContext.Provider>
  );
};

export default DigitalArena;
