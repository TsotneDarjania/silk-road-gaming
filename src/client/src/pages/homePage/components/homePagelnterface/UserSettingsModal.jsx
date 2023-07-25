import React, { useState, useContext, useRef } from "react";
import style from "./userSettingsModal.module.css";
import { AiFillCamera } from "react-icons/ai";
import "../../../../global.css";
import UserContext from "../../../../context/UserContext";
import { Api } from "../../../../api/api";
import Warning from "../../../../components/warning/Warning";
import PageContext from "../../../../context/PageContext";

const api = new Api();

const UserSettingsModal = (props) => {
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);

  const fileInputRef = useRef(null);
  const [fileVersion, setFileVersion] = useState(
    Math.floor(Math.random() * 100000000000)
  );

  const [name, setName] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  if (!props.showUserSettingModal) {
    return null;
  }

  function changeName(e) {
    e.preventDefault();
    if (name.length >= 3 && name.trim()) {
      api.changeUserName(
        userContext.userName,
        name,
        pageContext.setWarningProps,
        userContext.setUserName
      );
    }
    setName("");
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    api.uploadUserImage(userContext.userName, file);
    setFileVersion(Math.floor(Math.random() * 100000000000));
  };

  return (
    <div className={style.userSettingsModal}>
      {pageContext.warningProps.show && <Warning />}

      <div
        className="shadow"
        onClick={() =>
          showButtons === false && props.setShowUserSettingModal(false)
        }
      ></div>
      <div className={style.settingsContainer}>
        <div className={style.userAvatar}>
          <img
            src={`${userContext.userAvatar}v=${fileVersion}`}
            alt="user Avatar"
          />
          <button onClick={handleButtonClick} className={style.cameraBtn}>
            <AiFillCamera />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
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
              onClick={changeName}
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
            reset
          </button>
          {showButtons && (
            <div className={style.warningBox}>
              <p>ARE YOU SURE?</p>
              <div className={style.btnBox}>
                <button
                  onClick={() => {
                    api
                      .resetUserRating(userContext.userName)
                      .then((response) => {
                        api
                          .resetAllGames(userContext.userName)
                          .then((response) => {
                            window.location.reload();
                          });
                      });
                  }}
                >
                  YES
                </button>
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
