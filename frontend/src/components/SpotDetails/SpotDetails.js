import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { spotDetails } from '../../store/spots'
import { getReviews } from '../../store/reviews'
import { getMonthName } from '../../utils/dates';
import CreateNewReviewModal from '../CreateNewReviewModal/CreateNewReviewModal';
import OpenModalButton from '../Navigation/OpenModalButton';
import './SpotDetails.css'

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => state.reviews[spotId])

    useEffect(() => {
        dispatch(spotDetails(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    if (!spot && !reviews) {
        return null
    }

    //spot image items
    let spotImages;
    if (spot?.SpotImages) {
        spotImages = spot?.SpotImages?.map((image, index) => {
            return <img key={`${image.id}`} id={`house-img-${index + 1}`} className={`house-images preview-${image.preview}`} src={image.url} alt={`house${image.id}`} />
        })
    }

    //review component items
    let reviewItems;
    if (reviews) {
        reviewItems = reviews.map((review) => {
            const year = review.createdAt.slice(0, 4);
            const monthNum = review.createdAt.slice(5, 7);

            return (
                <div className='review-item-container' key={`${review?.id}`}>
                    <p className='review-user-firstName'>{review.User?.firstName}</p>
                    <p className='review-date'>{getMonthName(monthNum)} {year}</p>
                    <p className='review-description'>{review?.review}</p>
                    {sessionUser?.id === review?.User?.id && <button>Delete</button>}
                </div>
            )
        })
    } else {
        reviewItems = <div>No reviews for this spot yet!</div>
    }


    //check if user has reviewed this spot
    let hasUserReviewed = false;

    if (sessionUser && reviews) {
        for (let review of reviews) {
            if (review.userId === sessionUser.id) {
                hasUserReviewed = true;
            }
        }
    }

    return (
        <div className='outer-div'>
            <h1>{spot?.name}</h1>
            <p id='location-container'>{spot?.city}, {spot?.state}, {spot?.country}</p>
            <div id='spot-details-img-container'>
                {spotImages}
            </div>

            <div id='home-details'>
                <div className='house-description'>
                    <h2 id='hosted-by'>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
                    <p className='text-paragraphs'>{spot?.description}</p>
                </div>

                {/* Price and Reviews and Reserve Box */}
                <div id='price-reviews-container'>
                    <div id='price-review-inline-block'>
                        <p><span className='price-tag'>${spot?.price}</span> night</p>
                        {spot?.numReviews ?
                            <span className='rating-reviews'><i className="fa-solid fa-star"></i> {spot?.avgStarRating} · {spot?.numReviews} {spot?.numReviews > 1 ? 'reviews' : 'review'}</span>
                            :
                            <span className='rating-reviews'><i className="fa-solid fa-star"></i>New</span>
                        }
                    </div>
                    <button id='reserve' onClick={(e) => {
                        alert("Feature Coming Soon...");
                    }}>Reserve</button>
                </div>

            </div>
            {/* Reviews Container */}
            <div className='review-container'>
                <div>
                    <h2>
                        {spot?.numReviews ?
                            <span><i className="fa-solid fa-star"></i> {spot?.avgStarRating} <span id='dot-span'>·</span> {spot?.numReviews} {spot?.numReviews > 1 ? 'reviews' : 'review'}</span>
                            :
                            <span><i className="fa-solid fa-star"></i>New</span>
                        }
                    </h2>
                    {sessionUser && (sessionUser?.id !== spot?.Owner?.id) && !hasUserReviewed &&
                        <>

                            <OpenModalButton
                                className='modal-button'
                                buttonText='Post Your Review'
                                modalComponent={<CreateNewReviewModal />}

                            />

                            {spot?.numReviews ? <p></p> : <p>Be the first to post a review!</p>}
                        </>
                    }

                </div>
                {reviewItems}
            </div>
        </div>
    )


}

export default SpotDetails;