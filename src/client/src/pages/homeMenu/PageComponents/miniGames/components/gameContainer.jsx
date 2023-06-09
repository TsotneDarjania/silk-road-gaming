import { useState } from "react";
import style from "./gameContainer.module.css";
import ModalForComments from "../../../../../components/commentsModal/ModalForComments";
import AuthenticationModal from "../../../../../components/autenticationModal/AuthenticationModal";
import bgImage from "../../../images/games/miniGames/wallpapers/1.jpg";
import Indicators from "../../../components/Indicators";
import LinkButton from "../../../../../components/buttons/LinkButton";
import Leaderboard from "../../../../../components/leaderboard/Leaderboard";

const GameContainer = (props) => {
  const [showAutenticationModal, setShowAutenticationModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

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
        <img src={bgImage} alt="MiniGamesBackgroundImg" />
      </div>
      <div className={style.content}>
        <p className={style.name}> {props.data.name} </p>
        <p className={style.shortDescription}>{props.data.description}</p>
        <div className={style.buttonsBox}>
          <Indicators
            gameName={props.data.name}
            setShowCommentsModal={setShowCommentsModal}
            setShowLeaderBoardModal={props.setShowLeaderBoardModal}
          />
          <LinkButton
            innerText={"Play"}
            gameUrl={props.data.url}
            setShowAutenticationModal={setShowAutenticationModal}
          />
        </div>
      </div>
      {showCommentsModal && (
        <ModalForComments
          gameName={props.data.name}
          setShowCommentsModal={setShowCommentsModal}
        />
      )}
      {props.showLeaderBoardModal && (
        <Leaderboard setShowLeaderBoardModal={props.setShowLeaderBoardModal}/>
      )}
    </div>
  );
};

export default GameContainer;
