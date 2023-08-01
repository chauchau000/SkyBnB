import React, { useState, useEffect, useContext } from 'react'
import ReviewStars from './ReviewStars/ReviewStars';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import { spotDetails } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { context } from '../Navigation/OpenModalButton';
import './CreateNewReviewModal.css'

function CreateNewReviewModal() {
    const dispatch = useDispatch()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const { spotId } = useParams();
    const {setModal} = useContext(context)

    useEffect( () => {
        let validationErrors = {}
        if (review.length < 10) validationErrors.review = "Review needs to be more than 10 characters"
        if (!stars) validationErrors.stars = 'Stars must be set between 1 and 5'

        setErrors(validationErrors);

    }, [review, stars])

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newReview = { review, stars };
        let createdReview = await dispatch(createReview(newReview, spotId))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data) {
                        setErrors(data)
                    }
                }
        );
        if (createdReview) {
            dispatch(spotDetails(spotId))
            dispatch(getReviews(spotId))
            setModal(false)
        }
    }

    return (
        <div className='review-modal-container'>
            <h1>How was your stay?</h1>
            {errors.message && <p className='errors'>{errors.message}</p>}
            <form id='review-block' onSubmit={onSubmit}>
                    <textarea
                        rows="5" cols="40"
                        placeholder='Leave your review here'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                <div className='stars-container'>
                    <ReviewStars stars={stars} setStars={setStars} />
                </div>
                <button id='submit-review-button' type='submit' disabled={Object.values(errors).length}>Submit Your Review</button>
            </form>

        </div>
    )
}

export default CreateNewReviewModal
