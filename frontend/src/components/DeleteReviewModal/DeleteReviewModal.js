import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview, getReviews } from '../../store/reviews';
import { context } from '../Navigation/OpenModalButton';
import './DeleteReviewModal.css'

function DeleteReviewModal({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const { setModal } = useContext(context)


    const handleClick = async (e) => {
        await dispatch(deleteReview(reviewId)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data)
                };
            })

        await dispatch(getReviews(spotId))

        setModal(false)
    }


    return (
        <div id='delete-review-modal'>
            <h1>Confirm Delete</h1>
            <div id='delete-review-block'>
                <p>Are you sure you want to delete this review?</p>
                {errors && <p>{errors.message}</p>}
                <button className='delete-review-button' onClick={handleClick}>Yes &#40;Delete Review&#41;</button>
                <button className='delete-review-button' onClick={() => setModal(false)}>No &#40;Keep Review&#41;</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal