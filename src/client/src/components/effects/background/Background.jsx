import React from 'react'
import style from './background.module.css'
import Item from './components/Item'
import { getRandomFloat } from '../../../games/tbilisi-batumi-1/helper/tatukaMath'

const Background = ({images}) => {
    
    const getItems = () => {
        const length = window.innerWidth / 100 * 2
        const items = []

        for (let i = 0; i < length; i++) {
            const animationDelay = getRandomFloat(i, i + 2)
            const item = <Item image={images[0]} key={`item${i}`} left={getRandomFloat(0, window.innerWidth)} animationDelay={animationDelay}/>
            items.push(item)
        }
        return items
}
    

  return (
    <div className={style.backgroundContainer}>
      {getItems()}
    </div>
  )
}

export default Background
