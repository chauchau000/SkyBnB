import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { spots } from "../../store/spots";
import SpotItems from "./SpotItems/SpotItems";
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


    return (
        <div className='flex-container'>
            <SpotItems spots={allSpots} page='AllSpots'/>
        </div>
    )
}


export default Spots