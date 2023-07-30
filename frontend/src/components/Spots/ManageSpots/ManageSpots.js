// import { useEffect } from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import SpotItems from '../SpotItems/SpotItems'
import { getUserSpots } from '../../../store/session'
import './ManageSpots.css'


function ManageSpots() {
  const dispatch = useDispatch();

  
  const userSpotsObj = (useSelector((state) => state.session.spots))
  const userSpots = Object.values(userSpotsObj)
  useEffect(() => {
    dispatch(getUserSpots())
  }, [dispatch])
 
  return (
    <div id='manage-spots-container'>
      <h1>Manage Spots</h1>
      <Link to='/spots/new'>
        <button className='ManageSpots-button'>Create a New Spot</button>
      </Link>

    {userSpots ? 

      <div className='flex-container'>
        <SpotItems spots={userSpots} page='ManageSpots' />
      </div>
    
      : 
      
      <div>
        You do not have any spots to manage. Create a new spot with AirBnb now!
      </div>}
    </div>
  )
}

export default ManageSpots