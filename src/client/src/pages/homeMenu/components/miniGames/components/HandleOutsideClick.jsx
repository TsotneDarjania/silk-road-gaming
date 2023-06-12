import React, {useCallback, useRef} from 'react'
import { useEffect } from 'react'

const HandleOutsideClick = (props) => {
    const ref = useRef(null)
    const {onClickOutside, children} = props
    
    const handleClickOutside = useCallback((event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside && onClickOutside();
        }
      }, [onClickOutside]);

    useEffect(() => {
        const handleClick = (event) => handleClickOutside(event)
        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
        }
    }, [handleClickOutside]);    

    if(!children){
        return null
    }

    return (
    <div ref={ref}>
      {children}
    </div>
  )
}

export default HandleOutsideClick
