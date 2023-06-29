import { useContext, useState } from "react";
import style from "./gameContainer.module.css";
import ModalForComments from "../../../../../components/commentsModal/ModalForComments";
import AuthenticationModal from "../../../../../components/autenticationModal/AuthenticationModal";
import UserContext from "../../../../../context/UserContext";
import bgImage from "../../../images/games/miniGames/wallpapers/1.jpg";
import Indicators from "../../../components/Indicators";

const GameContainer = (props) => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const userContext = useContext(UserContext);

  return (
    <div className={style.gameContainer}>
      {showAutenticationModal && (
        <AuthenticationModal
          accessAction={() => {
            window.open(`${window.location.href}${props.data.url}`);
            setShowAutenticationModal(false);
          }}
          setShowAutenticationModal={setShowAutenticationModal}
        />
      )}
      <div className={style.gameBackgroundImage}>
        <img src={bgImage} />
      </div>
      <p className={style.name}> {props.data.name} </p>
      <p className={style.shortDescription}>{props.data.description}</p>
      <div className={style.buttonsBox}>
        <Indicators setShowCommentsModal={setShowCommentsModal} />
        <button
          onClick={() => {
            if (userContext.isLogin) {
              window.open(`${window.location.href}${props.data.url}`);
            } else {
              setShowAutenticationModal(true);
            }
          }}
          className={style.openButton}
        >
          Open
        </button>
      </div>
      {showCommentsModal && (
        <ModalForComments
          gameName={props.data.name}
          setShowCommentsModal={setShowCommentsModal}
        />
      )}
    </div>
  );
};

export default GameContainer;
