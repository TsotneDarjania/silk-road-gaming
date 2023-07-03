import React, { useContext } from 'react'
import '../../global.css'
import UserContext from '../../context/UserContext'

const LinkButton = ({
  innerText,
  gameUrl,
  setShowAutenticationModal
}) => {
  const userContext = useContext(UserContext)

  return (
    <button
    onClick={() => {
      if (userContext.isLogin) {
        window.open(`${window.location.href}${gameUrl}`);
      } else {
        setShowAutenticationModal(true);
      }
    }}
    className={innerText === 'Open' ? 'openButton' : 'playButton'}
  >
    {innerText}
  </button>
  )
}

export default LinkButton
