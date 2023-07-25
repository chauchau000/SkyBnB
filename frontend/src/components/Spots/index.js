import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { spots } from "../../store/spots";
import { Link } from "react-router-dom";
import './spots.css'

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
        return (
            <li key={spot.id} className='spot-item'> 
                <Link to={`/spots/${spot.id}`}><img src={spot.previewImage} alt={spot.name} width='300px' height='300px' /></Link>
                <p>{spot.city}, {spot.state} <span><i className="fa-solid fa-star"></i> {spot.avgRating}</span></p>
                <p>${spot.price}/night</p>
            </li>
        )
    })

    return (
        <ul className='grid-wrapper'>
            {spotItems}
        </ul>
    )
}

export default Spots