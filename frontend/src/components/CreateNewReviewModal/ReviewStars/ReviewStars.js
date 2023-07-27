
import React, { useState } from 'react'

function ReviewStars({ stars, setStars }) {
    const starsArr = Array(5).fill(0);
    const [hoverValue, setHoverValue] = useState(undefined)

    //fa-regular for open star
    //fa-solid for closed star
    const handleClick = (value) => {
        setStars(value);
    }

    const handleMouseOver = (value) => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    return (
        <>
            {starsArr.map((_, index) => {
                return (
                    <i 
                        key={index}
                        onClick={() => handleClick(index + 1)}
                        className={(hoverValue || stars) > index ? 'fa-star fa-solid' : 'fa-star fa-regular'}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave= {handleMouseLeave}
                    >
                    </i>
                )
            })}
        </>
    )
}

export default ReviewStars