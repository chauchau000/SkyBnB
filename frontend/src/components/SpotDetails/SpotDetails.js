import { useEffect, useState } from 'react';
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
    const [showReviewModal, setShowReviewModal] = useState(false);
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
        spotImages = spot?.SpotImages?.map((image) => {
            return <img key={`${image.id}`} className='house-images' src={image.url} alt={`house${image.id}`} />
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
                    {sessionUser.id === review.User?.id && <button>Delete</button>}
                </div>
            )
        })
    }

    const openReviewModal = () => {
        setShowReviewModal(!showReviewModal)
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
            <p>{spot?.city}, {spot?.state}, {spot?.country}</p>
            <div className='img-container'>
                {spotImages}
            </div>
            <div className='house-house-description'>
                <p>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</p>
                <p>{spot?.description}</p>
            </div>

            {/* Price and Reviews and Reserve Box */}
            <div className='price-reviews-container'>
                <div>
                    <p><span>{spot?.price}</span> night</p>
                    {spot?.numReviews ?
                        <span><i className="fa-solid fa-star"></i> {spot?.avgStarRating} · {spot?.numReviews} {spot?.numReviews > 1 ? 'reviews' : 'review'}</span>
                        :
                        <span><i className="fa-solid fa-star"></i>New</span>
                    }
                </div>
                <button onClick={(e) => {
                    alert("Feature Coming Soon...");
                }}>Reserve</button>
            </div>

            {/* Reviews Container */}
            <div className='review-container'>
                <div>
                    <h2>
                        {spot?.numReviews ?
                            <span><i className="fa-solid fa-star"></i> {spot?.avgStarRating} · {spot?.numReviews} {spot?.numReviews > 1 ? 'reviews' : 'review'}</span>
                            :
                            <span><i className="fa-solid fa-star"></i>New</span>
                        }
                    </h2>
                    {sessionUser && (sessionUser?.id !== spot?.Owner?.id) && !hasUserReviewed &&
                        <>
                            <button onClick={openReviewModal}>
                                <OpenModalButton
                                    className='modal-button'
                                    buttonText='Post Your Review'
                                    setShowMenu={setShowReviewModal}
                                    modalComponent={<CreateNewReviewModal  />}
                                    
                                />
                            </button>
                        </>
                    }
                    {spot?.numReviews ? <p></p> : <p>Be the first to post a review!</p>}

                </div>
                {reviewItems}
            </div>
        </div>
    )


}

export default SpotDetails;