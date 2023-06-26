import { useRef, useEffect, useState } from "react";
import style from "./ModalForComments.module.css";
import userAvatar from "../pages/homeMenu/images/userAvatar.png";
import { Api } from "../api/api";
import { ApiEnums } from "../enums/apiEnums";
import { getCookie } from "../helper/cookie";

const api = new Api();

const ModalForComments = (props) => {
  const commentRef = useRef(null);
  const commentSendButtonRef = useRef(null);
  const [commentsData, setCommentsData] = useState();

  const userRating = 2050;

  const renderComments = (comments) => {
    const commentItems = [];
    if (comments === undefined) return;

    comments.forEach((data) => {
      commentItems.push(
        <div className={style.singleComment} key={Math.random(100000)}>
          <div className={style.userAvatar}>
            <img src={userAvatar} alt="user Avatar" />
          </div>
          <div>
            <div className={style.userInfo}>
              <p> {data.user}</p>
              <span
                style={{
                  color:
                    data.userRating <= 1000
                      ? "yellow"
                      : userRating >= 2000
                      ? "green"
                      : "red",
                }}
              >
                {data.userRating}
              </span>
            </div>
            <p className={style.comment}>{data.comment}</p>
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
        commentsData = response.documents;
      });
  };

  useEffect(() => {
    console.log(props.gameName);
    if (props.gameName !== undefined && commentsData === undefined)
      getComments();
  }, [commentsData]);

  return (
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
                api
                  .insertCommentForGame(
                    JSON.parse(getCookie("loginSession")).userName,
                    ApiEnums.gameCommentsCollectionId,
                    props.gameName,
                    commentRef.current.value,
                    0
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
  );
};

export default ModalForComments;
