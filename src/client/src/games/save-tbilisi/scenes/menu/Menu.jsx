import style from "./style.module.css";
import { useState } from "react";

import { IoInformationCircleSharp } from "react-icons/io5";
import MenuInformationModal from "../../components/modals/MenuInformationModal";

export const Menu = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className={style.mainContainer}>
      <div className={style.backgroundImage}></div>
      <h1 className={style.gameTitle}>Save Tbilisi</h1>
      <button className={style.playButton}> Play</button>
      <div
        onClick={() => setShowInfoModal((current) => !current)}
        className={style.informationIcon}
      >
        <IoInformationCircleSharp />
      </div>

      {showInfoModal && <MenuInformationModal />}
    </div>
  );
};
