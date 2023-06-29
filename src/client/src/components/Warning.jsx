import React, {useContext} from 'react'
import style from "./warning.module.css"
import PageContext from '../context/PageContext'

const Warning = () => {
  const pageContext = useContext(PageContext)
  return (
    <div className={style.warning}>
        <div className={style.shadow}></div>
        <div className={style.content}>
            <h3 className={style.title}> Warning </h3>
            <p className={style.text}> {pageContext.warningProps.text} </p>
        </div>
        <button onClick={ () => {
            pageContext.setWarningProps({
              text: '',
              show: false
            })
        }} className={style.okButton}> Ok </button>
    </div>
  )
}

export default Warning