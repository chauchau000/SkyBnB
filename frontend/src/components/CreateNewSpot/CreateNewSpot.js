import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createNewSpot } from '../../store/spots'
import { createSpotImage } from '../../store/spotImages';
import "./CreateNewSpot.css";



function CreateNewSpot() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [url2, setUrl2] = useState('')
    const [url3, setUrl3] = useState('')
    const [url4, setUrl4] = useState('')
    const [url5, setUrl5] = useState('')
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};

        if (!country.length) errors.country = 'Country is required';
        if (!address.length) errors.address = 'Street address is required';
        if (!city.length) errors.city = 'City is required';
        if (!state.length) errors.state = 'State is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!name.length) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';
        if (!previewImage.length) errors.urlRequired = 'Preview image is required';
        if (previewImage && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpeg') && !previewImage.endsWith('.jpg')) errors.url = 'Image URL must end with .png, .jpg, or .jpeg';
        if (url2 && !url2.endsWith('.png') && !url2.endsWith('.jpeg') && !url2.endsWith('.jpg')) errors.url2 = 'Image URL must end with .png, .jpg, or .jpeg';
        if (url3 && !url3.endsWith('.png') && !url3.endsWith('.jpeg') && !url3.endsWith('.jpg')) errors.url3 = 'Image URL must end with .png, .jpg, or .jpeg';
        if (url4 && !url4.endsWith('.png') && !url4.endsWith('.jpeg') && !url4.endsWith('.jpg')) errors.url4 = 'Image URL must end with .png, .jpg, or .jpeg';
        if (url5 && !url5.endsWith('.png') && !url5.endsWith('.jpeg') && !url5.endsWith('.jpg')) errors.url5 = 'Image URL must end with .png, .jpg, or .jpeg';

        setErrors(errors)

    }, [country, address, city, state, description, name, price, previewImage, url2, url3, url4, url5])

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) history.push('/')


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

        const newSpot = await dispatch(createNewSpot(spot))

        // put all spot image urls into an array
        let spotImages = [{ "url": previewImage, "preview": true }];
        const urls = [url2, url3, url4, url5];
        urls.forEach((url) => {
            if (url) spotImages.push({ "url": url, "preview": false })
        })

        //for loops to create each spot image from spot id
        if (newSpot) {
            for (let spotImage of spotImages) {
                dispatch(createSpotImage(spotImage, newSpot.id))
            }
        }
        setErrors({})
        setHasSubmitted(false);

        history.push(`/spots/${newSpot.id}`)

    }

    return (
        <div className='create-spot-form-container'>
            <h1>Create a New Spot</h1>
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
                    <label id='create-new-spot-price'>
                        <span id='dollar-sign'>$ </span>  <input className='create-new-spot-input'
                            placeholder='Price per night (USD)'
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}

                        />
                    </label>
                    {hasSubmitted && errors.price && <p className='errors'>{errors.price}</p>}

                </div>

                {/* PHOTOS URL */}
                <div className='form-block'>
                    <h2>Liven up your spot with photos</h2>
                    <p className='create-new-spot-p'>Submit a link to at least one photo to publish your spot.</p>
                    <input className='url-input create-new-spot-input'
                        placeholder='Preview Image URL'
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}

                    />
                    {hasSubmitted && errors.urlRequired && <p className='errors'>{errors.urlRequired}</p>}

                    {hasSubmitted && errors.url && <p className='errors'>{errors.url}</p>}

                    <input className='url-input create-new-spot-input'
                        placeholder='Image URL'
                        type="text"
                        value={url2}
                        onChange={(e) => setUrl2(e.target.value)}
                    />
                    {hasSubmitted && errors.url2 && <p className='errors'>{errors.url2}</p>}

                    <input className='url-input create-new-spot-input'
                        placeholder='Image URL'
                        type="text"
                        value={url3}
                        onChange={(e) => setUrl3(e.target.value)}
                    />
                    {hasSubmitted && errors.url3 && <p className='errors'>{errors.url3}</p>}

                    <input className='url-input create-new-spot-input'
                        placeholder='Image URL'
                        type="text"
                        value={url4}
                        onChange={(e) => setUrl4(e.target.value)}
                    />
                    {hasSubmitted && errors.url4 && <p className='errors'>{errors.url4}</p>}

                    <input className='url-input create-new-spot-input'
                        placeholder='Image URL'
                        type="text"
                        value={url5}
                        onChange={(e) => setUrl5(e.target.value)}
                    />
                    {hasSubmitted && errors.url5 && <p className='errors'>{errors.url5}</p>}

                </div>
                <div className='button-container'>
                    <button type='submit' className='create-spot-button'>Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewSpot