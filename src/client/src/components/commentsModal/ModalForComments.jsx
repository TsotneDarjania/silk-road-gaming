import { useRef, useEffect, useState, useContext } from "react";
import style from "./ModalForComments.module.css";
import { Api } from "../../api/api";
import { ApiEnums } from "../../enums/apiEnums";
import { getCookie } from "../../helper/cookie";

import "../../global.css";
import UserContext from "../../context/UserContext";

const api = new Api();

const ModalForComments = (props) => {
  const userContext = useContext(UserContext);

  const commentRef = useRef(null);
  const commentSendButtonRef = useRef(null);
  const [commentsData, setCommentsData] = useState();

  const [imageVersion, setImageVersion] = useState(
    Math.floor(Math.random() * 100000000000)
  );

  const renderComments = (comments) => {
    const commentItems = [];
    if (comments === undefined) return;

    comments.forEach((data) => {
      commentItems.push(
        <div className={style.singleComment} key={Math.random(100000)}>
          <div className={style.userAvatar}>
            <img
              src={`${data.userAvatarImageProfiles}v=${imageVersion}`}
              alt="user Avatar"
            />
          </div>
          <div>
            <div className={style.userInfo}>
              <p> {data.user}</p>
              <span
                style={{
                  color:
                    data.userRating <= 1000
                      ? "yellow"
                      : data.userRating >= 2000
                      ? "green"
                      : "red",
                }}
              >
                {data.userRating}
              </span>
            </div>
            <p className={style.comment}>{data.comment}</p>
            <p className={style.date}>{data.date}</p>
          </div>
        </div>
      );
    });

    return commentItems;
  };

  const getComments = () => {
    let commentsData;
    api
      .getGameComments(ApiEnums.gameCommentsCollectionId, props.gameName)
      .then((response) => {
        setCommentsData(response.documents);
        renderComments(commentsData);
      });
  };

  useEffect(() => {
    if (props.gameName !== undefined && commentsData === undefined)
      getComments();
  }, [commentsData]);

  return (
    <div className={style.commentsModal}>
      <div
        className="shadow"
        onClick={() => props.setShowCommentsModal(false)}
      ></div>
      <div className={style.commentsContainer}>
        <div className={style.commentsSection}>
          {renderComments(commentsData)}
        </div>
        <div className={style.userComment}>
          <div className={style.inputBox}>
            <textarea
              onChange={(e) => {
                if (e.target.value.length > 2) {
                  commentSendButtonRef.current.style.opacity = 0.5;
                } else {
                  commentSendButtonRef.current.style.opacity = 0;
                }
              }}
              maxLength={1000}
              ref={commentRef}
              placeholder="Add your comment here..."
            />
            <button
              ref={commentSendButtonRef}
              className={style.commentSendButton}
              type="button"
              onClick={() => {
                if (commentRef.current.value.length > 2) {
                  const date = new Date();
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const year = date.getFullYear();
                  const commentDate = `${day}.${month}.${year}`;

                  api
                    .insertCommentForGame(
                      userContext.userName,
                      ApiEnums.gameCommentsCollectionId,
                      props.gameName,
                      commentRef.current.value,
                      0,
                      userContext.userAvatar,
                      commentDate
                    )
                    .then(
                      (response) => {
                        commentSendButtonRef.current.style.opacity = 0;
                        commentRef.current.value = "";
                        getComments();
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForComments;
