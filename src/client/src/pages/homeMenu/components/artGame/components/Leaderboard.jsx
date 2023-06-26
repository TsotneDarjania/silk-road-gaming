import React from 'react'
import style from './leaderboard.module.css'
import gameIcon from '../../../images/batumiskenIcon.png'

const Leaderboard = (props) => {
  if(!props.showLeader){
    return null
  }     
  return (
    <div className={style.leaderboard}>

    </div>
  )
}

export default Leaderboard
