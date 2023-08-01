import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSpot, getUserSpots } from '../../store/session';
import { context } from '../Navigation/OpenModalButton';
import './DeleteSpot.css'

function DeleteSpot({ spotId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const {setModal} = useContext(context)


    const handleClick = async (e) => {
        await dispatch(deleteSpot(spotId)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data)
                };
            })
        
        await dispatch(getUserSpots())
        
        setModal(false)
    }

    return (
        <div id='delete-spot-modal-container'>
            <h1>Confirm Delete</h1>
            <div>
                <p>Are you sure you want to remove this spot from the listings?</p>
                {errors && <p>{errors.message}</p>}
                <button id='confirm-delete-button' onClick={handleClick}>Yes &#40;Delete Spot&#41;</button>
                <button id='deny-delete-button' onClick={() => setModal(false)}>No &#40;Keep Spot&#41;</button>
            </div>
        </div>
    )
}

export default DeleteSpot