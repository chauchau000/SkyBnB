import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { spots } from "../../store/spots";
import './spots.css'

function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spots());
    }, [dispatch])

    const allSpots = useSelector((state) => state.spots.Spots)
    
    if (!allSpots) {
        return null;
      }

    let spotItems = allSpots.map((spot) => {
        return (
            <li key={spot.id} className='spot-item'> 
                <img src={spot.previewImage} alt={spot.name} width='300px' height='300px' />
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