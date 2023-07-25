import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { spotDetails } from '../../store/spots'
import { getReviews } from '../../store/reviews'
import { getMonthName } from '../../utils/dates';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotDetails(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => state.reviews[spotId])
    if (!spot || !reviews) {
        return null
    }

    let spotImages;
    if (spot.SpotImages) {
        spotImages = spot.SpotImages.map((image) => {
            return <img className='house-images' src={image.url} alt={`house${image.id}`} />
        })
    }
    let reviewItems;
    if (reviews) {
        reviewItems = reviews.map((review) => {
            const year = review.createdAt.slice(0, 4);
            const monthNum = review.createdAt.slice(5, 7);

            return (
                <div className='review-item-container' key={`${review.id}`}>
                    <p className='review-user-firstName'>{review.User.firstName}</p>
                    <p className='review-date'>{getMonthName(monthNum)} {year}</p>
                    <p className='review-description'>{review.review}</p>
                </div>
            )
        })
    }

    return (
        <div className='outer-div'>
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className='img-container'>
                {spotImages}
            </div>
            <div className='house-house-description'>
                <p>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</p>
                <p>{spot.description}</p>
            </div>
            <div className='price-reviews-container'>
                <p><span>{spot.price} night</span>     <span><i className="fa-solid fa-star"></i> {spot.avgStarRating} · {spot.numReviews} reviews</span></p>
                <button onClick={(e) => {
                    alert("Feature Coming Soon...");
                }}>Reserve</button>
            </div>
            <div className='review-container'>
                <div>
                    <h2><span><i class="fa-solid fa-star"></i> {spot.avgStarRating} · {spot.numReviews} reviews</span></h2> 
                    {sessionUser && <button>Post Your Review</button>}
                </div>
                {reviewItems}
            </div>

        </div>
    )
}

export default SpotDetails;