import React, { useState } from "react";
import style from "./homePageInterface.module.css";

import { deleteCookies, getCookie } from "../../../../helper/cookie";

import { CgMenuGridR } from "react-icons/cg";
import UserSettingsModal from "./UserSettingsModal";

const HomePageInterface = ({ setIsLogin }) => {
  const [userName, setUserName] = useState(
    JSON.parse(getCookie("loginSession")).userName
  );

  const logOut = () => {
    deleteCookies();
    setIsLogin(false);
  };

  const [menuClassName, setMenuClassName] = useState("");
  const [showUserSettingModal, setShowUserSettingModal] = useState(false);
  const [open, setOpen] = useState(false);

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

      <div className={style["menu"] + " " + style[menuClassName]}>
        <ul>
          <li onClick={() => setShowUserSettingModal(true)}> {userName} </li>
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
          <li className={style.gamesItem}>
            <ul>
              <li> Batumisken </li>
              <li> 33/34/1220 </li>
              <li className={style.continueButton}> Continue </li>
            </ul>
            <ul>
              <li> Batumisken </li>
              <li> 33/34/1220 </li>
              <li className={style.continueButton}> Continue </li>
            </ul>
            <ul>
              <li> Batumisken </li>
              <li> 33/34/1220 </li>
              <li className={style.continueButton}> Continue </li>
            </ul>
            <ul>
              <li> Batumisken </li>
              <li> 33/34/1220 </li>
              <li className={style.continueButton}> Continue </li>
            </ul>
            <ul>
              <li> Batumisken </li>
              <li> 33/34/1220 </li>
              <li className={style.continueButton}> Continue </li>
            </ul>
          </li>
        </ul>
      </div>

      <UserSettingsModal
        open={open}
        setOpen={setOpen}
        showUserSettingModal={showUserSettingModal}
        userName={userName}
        setUserName={setUserName}
        setShowUserSettingModal={setShowUserSettingModal}
      />
    </div>
  );
};

export default HomePageInterface;
