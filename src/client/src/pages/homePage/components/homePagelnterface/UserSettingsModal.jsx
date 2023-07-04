import React, { useState, useContext } from "react";
import style from "./userSettingsModal.module.css";
import { AiFillCamera } from "react-icons/ai";
import "../../../../global.css";
import UserContext from "../../../../context/UserContext";

const UserSettingsModal = (props) => {
  const userContext = useContext(UserContext);

  const [name, setName] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  if (!props.showUserSettingModal) {
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.length >= 3 && name.trim()) {
      userContext.setUserName(name);
    }
    setName("");
  }

  return (
    <div className={style.userSettingsModal}>
      <div
        className="shadow"
        onClick={() =>
          showButtons === false && props.setShowUserSettingModal(false)
        }
      ></div>
      <div className={style.settingsContainer}>
        <div className={style.userAvatar}>
          <img src={userContext.userAvatar} alt="user Avatar" />
          <button className={style.cameraBtn}>
            <AiFillCamera />
          </button>
        </div>
        <div className={style.userNameBox}>
          <p className={style.userNameBoxTitle}>Change Name</p>
          <div>
            <input
              className={style.userNameInput}
              type="text"
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              placeholder={userContext.userName}
              value={name}
            />
            <button
              className={style.saveBtn}
              onClick={handleSubmit}
              style={{
                opacity: name.length >= 3 && name.trim() ? "1" : "0",
              }}
            >
              save
            </button>
          </div>
        </div>
        <div className={style.resetBox}>
          <button
            onClick={() => setShowButtons(true)}
            className={style.resetBtn}
          >
            RESET
          </button>
          {showButtons && (
            <div className={style.warningBox}>
              <p>ARE YOU SURE?</p>
              <div className={style.btnBox}>
                <button onClick={() => setShowButtons(false)}>YES</button>
                <button onClick={() => setShowButtons(false)}>NO</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
