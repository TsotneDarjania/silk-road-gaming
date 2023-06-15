import React from 'react'
import style from './ModalForComments.module.css'
import userAvatar from './userAvatar.png'

const ModalForComments = (props) => {
  if (!props.show) {
    return null
  }
  const userRating = 2050;

  return (
    <div className={style.commentsContainer}>
      <div className={style.commentsSection}>
        {Array.apply(null, { length: 10 }).map((e, i) => (
          <div className={style.singleComment} key={i}>
            <div className={style.userAvatar}>
              <img src={userAvatar} alt="user Avatar" />
            </div>
            <div>
              <div className={style.userInfo}>
                <p>User Name</p>
                <span
                  style={{
                    color: userRating <= 1000 ? 'yellow' : userRating >= 2000 ? 'green' : 'red'
                  }}
                >2050</span>
              </div>
              <p className={style.comment}>
                asiudhasiud asiudhasd asiudhasd asiud aisudhqiwudqwd iquwdh
                iudwd wudhqiud qiwudhwiud diwuw wuwd w wdwd dwd wdiuqwdh
                qiwudhqiwudhqiwduhqd qdwuhd iudhwiqudhqd iwuw wudhwd
                iuwhdiuwhdiqwuh qiwudhqiwud qiduqwiduhd
                asiudhasiud asiudhasd asiudhasd asiud aisudhqiwudqwd iquwdh
                iudwd wudhqiud qiwudhwiud diwuw wuwd w wdwd dwd wdiuqwdh
                qiwudhqiwudhqiwduhqd qdwuhd iudhwiqudhqd iwuw wudhwd
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.userComment}>
        <div className={style.inputBox}>
          <textarea placeholder="Add your comment here..." />
        </div>
      </div>
    </div>
  )
}

export default ModalForComments
