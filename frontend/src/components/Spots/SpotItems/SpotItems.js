import React from 'react';
import { Link } from "react-router-dom";
import OpenModalButton from '../../Navigation/OpenModalButton';
import DeleteSpot from '../../DeleteSpot/DeleteSpot';
import './SpotItems.css'


function SpotItems({ spots, page }) {

  let spotItems = spots.map((spot) => {
    const handleMouseMove = (e) => {
      let x = e.clientX;
      let y = e.clientY;
      document.getElementById(`spot-id-${spot?.id}`).style.left = (x + 10) + "px";
      document.getElementById(`spot-id-${spot?.id}`).style.top = (y + 10) + "px";
    }

    return (
      <div key={spot?.id} className='grid-item'>

        {/* SPOT TILE */}
        <Link to={`/spots/${spot?.id}`}>
          <div className='img-container' onMouseMove={(handleMouseMove)}>
            <img className='spot-tile-img' src={spot?.previewImage} alt={spot?.name} />
            <div className='tooltip' id={`spot-id-${spot?.id}`}>{spot?.name}</div>
          </div>
        </Link>

        {/* CITY, STATE, STARS, AVG RATING */}
        <p className='state-stars-container'>
          <span className='state-stars city-state'>{spot?.city}, {spot?.state} </span>
          <span className='state-stars'><i className="fa-solid fa-star"></i>
            {
              spot?.avgRating ? <span className='avg-rating'>{spot?.avgRating}</span> : <span>New</span>
            }

          </span>
        </p>

        {/* PRICE */}
        <p className='price-container'><span id='spot-price'> ${spot?.price} </span> night</p>


        {page === 'ManageSpots' ?
          (<div className='update-delete-container'>
            <Link to={`/user/spots/${spot.id}/edit`}>
              <button className={`${page}-button`}>Update</button>
            </Link>

            <button className={`${page}-button`}>
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpot spotId={spot.id} />}
              />
            </button>
          </div>) : <></>}

      </div>
    )
  })

  return (
    <>
      {spotItems}
    </>
  )
}

export default SpotItems