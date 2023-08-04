import React, { useContext, useEffect, useState } from "react";
import style from "./homePageInterface.module.css";

import { deleteCookies } from "../../../../helper/cookie";

import { CgMenuGridR } from "react-icons/cg";
import UserSettingsModal from "./UserSettingsModal";
import UserContext from "../../../../context/UserContext";
import { Api } from "../../../../api/api";
import { ID } from "appwrite";

const api = new Api();

const HomePageInterface = () => {
  const userContext = useContext(UserContext);

  const logOut = () => {
    deleteCookies();
    userContext.setIsLogin(false);
  };

  const [menuClassName, setMenuClassName] = useState("");
  const [showUserSettingModal, setShowUserSettingModal] = useState(false);

  const [lastPlayedGames, setLastPlayerdGames] = useState();

  useEffect(() => {
    getLastPlayedGames();
  }, [userContext.userName]);

  const getLastPlayedGames = () => {
    const items = [];
    api.getLastPlayedGames(userContext.userName).then((response) => {
      response.documents.forEach((document) => {
        const item = (
          <ul key={Math.random()}>
            <li key={Math.random()}> {document.gameName} </li>
            <li key={Math.random()}>{document.date} </li>
            <li
              key={Math.random()}
              onClick={() => {
                const gameUrl = document.gameName.replace(" ", "-");
                window.open(
                  `https://silk-road-gaming-3g2l.vercel.app/games/${gameUrl}`
                );
              }}
              className={style.continueButton}
            >
              Continue
            </li>
          </ul>
        );

        items.push(item);
      });

      setLastPlayerdGames(items.reverse());
    });
  };

  return (
    <div className={style.homePageInterface}>
      <div
        onClick={() => {
          menuClassName === "showMenu"
            ? setMenuClassName(" ")
            : setMenuClassName("showMenu");
        }}
        className={style.homeIcon}
      >
        <CgMenuGridR />
      </div>

      <div
        className={style["menu"] + " " + style[menuClassName]}
        style={{
          zIndex: menuClassName === "showMenu" ? 1 : 0,
        }}
      >
        <ul>
          <li onClick={() => setShowUserSettingModal(true)}>
            {userContext.userName}
          </li>
          <li
            onClick={() => {
              logOut();
            }}
          >
            Log Out
          </li>
        </ul>
      </div>

      <div className={style.gameHistoryContainer}>
        <h2>Your Last played games</h2>
        <ul className={style.gamesContainer}>
          <li className={style.gamesItem}>{lastPlayedGames} </li>
        </ul>
      </div>

      <UserSettingsModal
        showUserSettingModal={showUserSettingModal}
        setShowUserSettingModal={setShowUserSettingModal}
      />
    </div>
  );
};

export default HomePageInterface;
