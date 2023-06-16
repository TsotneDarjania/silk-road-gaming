import React, { useState } from "react";
import style from "./homePageInterface.module.css";

import image from "./user.png";
import { deleteCookies, getCookie } from "../../../../helper/cookie";

import { CgMenuGridR } from "react-icons/cg";

const HomePageInterface = ({ setIsLogin }) => {
  const [userName, setUserName] = useState(
    JSON.parse(getCookie("loginSession")).userName
  );

  const logOut = () => {
    deleteCookies();
    setIsLogin(false);
  };

  const [menuClassName, setMenuClassName] = useState("");

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
          <li> {userName} </li>
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
    </div>
  );
};

export default HomePageInterface;
