import React, {useState} from 'react'
import style from './artGames.module.css'
import ArtGameContainer from './components/ArtGameContainer'
import Shadow from '../../../../components/Shadow'

const ArtGames = () => {
  const [show, setShow] = useState(false)  
  const shadowProperty = {
    opacity: 0.5,
    transition: "0.5s",
    show: show,
    setShow: setShow,
  };

  return (
    <div className={style.artGames}>
        <Shadow props={shadowProperty}/>
        <ArtGameContainer show={show} setShow={setShow}/>
        <ArtGameContainer show={show} setShow={setShow}/>
    </div>
  )
}

export default ArtGames
