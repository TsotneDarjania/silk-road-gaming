import React, { useState } from "react";
import style from "./userSettingsModal.module.css";
import userAvatar from "../../../homeMenu/images/userAvatar.png";
import { AiFillCamera } from "react-icons/ai";

const UserSettingsModal = (props) => {
  const [name, setName] = useState("");
  if (!props.show) {
    return null;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (name.length >= 3 && name.trim()) {
      props.setUserName(name);
    }
    setName("");
  }

  return (
    <div className={style.settingsContainer}>
      <div className={style.userAvatar}>
        <img src={userAvatar} alt="user Avatar" />
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
            placeholder={props.userName}
            value={name}
          />
          <button
            className={style.saveBtn}
            onClick={handleSubmit}
            style={{
              opacity: name.length >= 3 && name.trim() ? "1" : "0"
            }}
          >
            save
          </button>
        </div>
      </div>
      <div className={style.resetBox}>
        <button onClick={() => props.setOpen(true)} className={style.resetBtn}>
          RESET
        </button>
        <div
          className={style.warningBox}
          style={{ display: props.open ? "flex" : "none"}}
        >
          <p>ARE YOU SURE?</p>
          <div className={style.btnBox}>
            <button onClick={() => props.setOpen(false)}>YES</button>
            <button onClick={() => props.setOpen(false)}>NO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
