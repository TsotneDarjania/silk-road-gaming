import React from 'react'
import style from './item.module.css'
import { getRandomFloat } from '../../../../games/tbilisi-batumi-1/helper/tatukaMath'

const Item = ({image, left, animationDelay}) => {

  return (
    <>
      <img className={style.image} src={image} style={{left, animationDelay: `${animationDelay}s`}} />
    </>
  )
}

export default Item
