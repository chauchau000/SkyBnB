import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SpotItems from '../SpotItems/SpotItems'
import './ManageSpots.css'


function ManageSpots() {
  const dispatch = useDispatch();
  const userSpots = Object.values(useSelector((state) => state.session.spots))

  return (
    <>
      <h1>Manage Your Spots</h1>
      <Link to='/spots/new'>
        <p>Create a New Spot</p>
      </Link>
      <div className='flex-container'>
        <SpotItems spots={userSpots} page='ManageSpots' />
      </div>
    </>
  )
}

export default ManageSpots