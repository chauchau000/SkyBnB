import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { spots } from "../../store/spots";
import { Link } from "react-router-dom";
import './Spots.css'

function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spots());
    }, [dispatch])

    const allSpots = Object.values(useSelector((state) => state.spots))

    if (!allSpots) {
        return null;
    }

    
    let spotItems = allSpots.map((spot) => {
        const handleMouseMove = (e) => {
            let x = e.clientX;
            let y = e.clientY;
            document.getElementById(`spot-id-${spot?.id}`).style.left = (x +10) + "px";
            document.getElementById(`spot-id-${spot?.id}`).style.top = (y+10) + "px";
        }

        return (
            <li key={spot?.id} className='flex-item'>
                <Link to={`/spots/${spot?.id}`}>
                    <div className='img-container' onMouseMove={(handleMouseMove)}>
                        <img src={spot?.previewImage} alt={spot?.name} width='300px' height='300px' />
                        <div className='tooltip' id={`spot-id-${spot?.id}`}>{spot?.name}</div>
                    </div>
                </Link>
                <p>{spot?.city}, {spot?.state} <span><i className="fa-solid fa-star"></i> {spot?.avgRating}</span></p>
                <p><span id='spot-price'> ${spot?.price} </span> night</p>
            </li>
        )
    })

    return (
        <ul className='flex-container'>
            {spotItems}
        </ul>
    )
}

export default Spots