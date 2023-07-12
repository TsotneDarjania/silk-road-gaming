import React, { useContext } from "react";
import style from "./leaderboard.module.css";
import "../../global.css";
import gameIcon from "../../pages/homeMenu/images/batumiskenIcon.png";
import userAvatar from "../../pages/homeMenu/images/userAvatar.png";
import goldMedalIcon from "../../pages/homeMenu/images/medal icons/goldMedal.png";
import silverMedalIcon from "../../pages/homeMenu/images/medal icons/silverMedal.png";
import bronzeMedalIcon from "../../pages/homeMenu/images/medal icons/bronzeMedal.png";
import UserContext from "../../context/UserContext";

const userInfo = [
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
  {
    userName: "ანდრია ტყეშელაშვილი!",
    gameScore: 750,
    allCore: 1500,
    userAvatar: userAvatar,
  },
];

const Leaderboard = ({ setShowLeaderBoardModal }) => {
  const userContext = useContext(UserContext);

  return (
    <div className={style.leaderBoard}>
      <div
        className="shadow"
        onClick={() => setShowLeaderBoardModal(false)}
      ></div>
      <div className={style.leaderBoardContainer}>
        <div className={style.gameInfo}>
          <div className={style.gameIcon}>
            <img src={gameIcon} alt="game icon" />
          </div>
        </div>

        {userContext.isLogin && (
          <div className={style.currentUser}>
            <p>Your Position: </p>
            <span className={style.currenUserNumber}>205</span>
          </div>
        )}

        <div className={style.leaderBoardList}>
          {userInfo.map((data, i) => (
            <div className={style.userPosition} key={i}>
              <span className={style.number}>
                {i < 3 ? (
                  <img
                    src={
                      i === 0
                        ? goldMedalIcon
                        : i === 1
                        ? silverMedalIcon
                        : bronzeMedalIcon
                    }
                    alt="medal icon"
                  />
                ) : (
                  i + 1
                )}
              </span>
              <div className={style.userAvatar}>
                <img src={data.userAvatar} alt="user avatar" />
              </div>
              <div className={style.userBox}>
                <p className={style.userName} title={data.userName}>
                  {data.userName.length > 10
                    ? data.userName.slice(0, 11) + "..."
                    : data.userName}
                </p>
                <span className={style.gameScore}>{data.gameScore}</span>
              </div>
              <span className={style.allScore}>{data.allCore}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
