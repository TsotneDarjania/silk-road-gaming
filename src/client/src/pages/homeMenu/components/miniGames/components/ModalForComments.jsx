import React from 'react'
import style from './ModalForComments.module.css'
import { IoSend } from 'react-icons/io5'
import userAvatar from './userAvatar.png'
const ModalForComments = (props) => {
  if (!props.show) {
    return null
  }
  return (
    <div className={style.commentsContainer}>
      <div className={style.commentsSection}>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <div className={style.singleComment} key={i}>
            <div className={style.userAvatar}>
              <img src={userAvatar} alt="user Avatar" />
            </div>
            <div>
              <p>User Name</p>
              <p className={style.comment}>
                asiudhasiud asiudhasd asiudhasd asiud aisudhqiwudqwd iquwdh
                iudwd wudhqiud qiwudhwiud diwuw wuwd w wdwd dwd wdiuqwdh
                qiwudhqiwudhqiwduhqd qdwuhd iudhwiqudhqd iwuw wudhwd
                iuwhdiuwhdiqwuh qiwudhqiwud qiduqwiduhd
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.userComment}>
        <div className={style.userAvatar}>
          <img src={userAvatar} alt="user Avatar" />
        </div>
        <div className={style.inputBox}>
          <textarea placeholder="Add your comment here..." />
          <button className={style.sendIcon}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalForComments
