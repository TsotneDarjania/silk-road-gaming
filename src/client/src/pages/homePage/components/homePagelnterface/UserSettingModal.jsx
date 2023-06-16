import React from 'react'
import style from './UserSettingModal.module.css'

const UserSettingModal = (props) => {
  if(!props.show){
    return null
  }  
  return (
    <div className={style.settingsContainer}>
      good
    </div>
  )
}

export default UserSettingModal
