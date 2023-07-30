import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams} from 'react-router-dom';
import { updateSpot } from '../../store/spots';
import './UpdateSpot.css'

function UpdateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams()

    const spot = useSelector( state => state.spots[spotId])
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const errors = {};

        if (!country?.length) errors.country = 'Country is required';
        if (!address?.length) errors.address = 'Street address is required';
        if (!city?.length) errors.city = 'City is required';
        if (!state?.length) errors.state = 'State is required';
        if (description?.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!name?.length) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';

        setErrors(errors)

    }, [country, address, city, state, description, name, price])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(errors).length) {
            return
        }

        //submit button stuff
        const spot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat: 0,
            lng: 0
        }

        const newSpot = await dispatch(updateSpot(spot, spotId))

        
        setErrors({})
        setHasSubmitted(false);

        history.push(`/spots/${spotId}`)
    }




  return (
    <div className='form-container'>
            <h1>Update your Spot</h1>
            <h2>Where's your place located?</h2>
            <p className='create-new-spot-p'>Guests will only get your exact address once they booked a reservation</p>
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <div className='form-block'>
                    <label>
                        <p className='input-name'>Country</p>
                        <input className='create-new-spot-input'
                            placeholder='Country'
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}

                        />
                    </label>
                    {hasSubmitted && errors.country && <p className='errors'>{errors.country}</p>}
                    <label>
                        <p className='input-name'>Street Address</p>
                        <input className='create-new-spot-input'
                            placeholder='Address'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}

                        />
                    </label>
                    {hasSubmitted && errors.address && <p className='errors'>{errors.address}</p>}

                    <div id='city-state'>
                        <div id='city-block'>
                            <p className='input-name'>City</p>
                            <label id='city-label'>
                                <input id='city-input' className='create-new-spot-input'
                                    placeholder='City'
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <span id='separator'>, </span>
                            </label>
                        </div>
                        <div id='state-block'>

                            <label>
                                <p className='input-name'>State</p>
                                <input id='state-input' className='create-new-spot-input'
                                    placeholder='State'
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}

                                />
                            </label>
                        </div>
                    </div>
                    {hasSubmitted && errors.city && <p className='errors'>{errors.city}</p>}
                    {hasSubmitted && errors.state && <p className='errors'>{errors.state}</p>}


                </div>
                <div className='form-block'>
                    <h2>Describe your place to guests</h2>
                    <p className='create-new-spot-p'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea className='create-new-spot-input description-text-area'
                        placeholder='Please write at least 30 characters.'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                    {hasSubmitted && errors.description && <p className='errors'>{errors.description}</p>}

                </div>
                <div className='form-block'>
                    <h2>Create a title for your spot</h2>
                    <p className='create-new-spot-p'>Catch guest's attetnion with a spot ittle that highlights what makes your place special.</p>
                    <input className='create-new-spot-input'
                        placeholder='Name of your spot'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />
                    {hasSubmitted && errors.name && <p className='errors'>{errors.name}</p>}

                </div>
                <div className='form-block'>
                    <h2>Set a base price for your spot</h2>
                    <p className='create-new-spot-p'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <label>
                        <span>$</span>  <input className='create-new-spot-input'
                            placeholder='Price per night (USD)'
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}

                        />
                    </label>
                    {hasSubmitted && errors.price && <p className='errors'>{errors.price}</p>}

                </div>

                <div className='button-container'>
                    <button type='submit' className='create-spot-button'>Create Spot</button>
                </div>
            </form>
        </div>
  )
}

export default UpdateSpot