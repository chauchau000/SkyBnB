import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { createNewSpot } from '../../store/spots'
import { createSpotImage } from '../../store/spotImages';
import "./CreateNewSpot.css";



function CreateNewSpot() {

    const dispatch = useDispatch();

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLatitude] = useState('')
    const [lng, setLongitude] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [url2, setUrl2] = useState('')
    const [url3, setUrl3] = useState('')
    const [url4, setUrl4] = useState('')
    const [url5, setUrl5] = useState('')
    const [errors, setErrors] = useState({});
    const [imageErrors, setImageErrors] = useState({})


    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        setImageErrors({})
        //submit button stuff
        const spot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        
        const newSpot = await dispatch(createNewSpot(spot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    return setErrors(data.errors)
                }
            }
        )

        if (!newSpot) {
            if (!previewImage) setImageErrors({urlrequired: "Preview image is required."})
            return
        }

        let spotImages = [{ "url": previewImage, "preview": true }];
        const urls = [url2, url3, url4, url5];
        urls.forEach((url) => {
            if (url) spotImages.push({ "url": url, "preview": false })
        })

        for (let spotImage of spotImages) {
            dispatch(createSpotImage(spotImage, newSpot.id)).catch(
                async (res) => {
                    const data = await res.json();
                    console.log(errors)
                    if (data && data.message) {
                        return setImageErrors(data.errors)
                    }
                }
            )
        }
 
    }

    return (
        <div className='form-container'>
            <div className='flex-item'>
                <h1>Create a new Spot</h1>
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
                        {errors.country && <p className='errors'>{errors.country}</p>}
                        <label>
                            <p className='input-name'>Street Address</p>
                            <input className='create-new-spot-input'
                                placeholder='Address'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}

                            />
                        </label>
                        {errors.address && <p className='errors'>{errors.address}</p>}

                        <label>
                            <p className='input-name'>City</p>
                            <input className='create-new-spot-input'
                                placeholder='City'
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}

                            />
                        </label>
                        {errors.city && <p className='errors'>{errors.city}</p>}

                        <label>
                            <p className='input-name'>State</p>
                            <input className='create-new-spot-input'
                                placeholder='State'
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}

                            />
                        </label>
                        {errors.state && <p className='errors'>{errors.state}</p>}

                        <label>
                            <p className='input-name'>Latitude</p>

                            <input className='create-new-spot-input'
                                placeholder='Latitude'
                                type="text"
                                value={lat}
                                onChange={(e) => setLatitude(e.target.value)}

                            />
                        </label>
                        {errors.lat && <p className='errors'>{errors.lat}</p>}

                        <label>
                            <p className='input-name'>Longitude</p>
                            <input className='create-new-spot-input'
                                placeholder='Longitude'
                                type="text"
                                value={lng}
                                onChange={(e) => setLongitude(e.target.value)}

                            />
                        </label>
                        {errors.lng && <p className='errors'>{errors.lng}</p>}

                    </div>
                    <div className='form-block'>
                        <h2>Describe your place to guests</h2>
                        <p className='create-new-spot-p'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea className='create-new-spot-input description-text-area'
                            placeholder='Please write at least 30 characters.'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                        {errors.description && <p className='errors'>{errors.description}</p>}

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
                        {errors.name && <p className='errors'>{errors.name}</p>}

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
                        {errors.price && <p className='errors'>{errors.price}</p>}

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
                        {imageErrors.urlrequired && <p className='errors'>{imageErrors.urlrequired}</p>}

                        {imageErrors.url && <p className='errors'>{imageErrors.url}</p>}

                        <input className='url-input create-new-spot-input'
                            placeholder='Image URL'
                            type="text"
                            value={url2}
                            onChange={(e) => setUrl2(e.target.value)}
                        />

                        <input className='url-input create-new-spot-input'
                            placeholder='Image URL'
                            type="text"
                            value={url3}
                            onChange={(e) => setUrl3(e.target.value)}

                        />
                        <input className='url-input create-new-spot-input'
                            placeholder='Image URL'
                            type="text"
                            value={url4}
                            onChange={(e) => setUrl4(e.target.value)}

                        />
                        <input className='url-input create-new-spot-input'
                            placeholder='Image URL'
                            type="text"
                            value={url5}
                            onChange={(e) => setUrl5(e.target.value)}

                        />
                    </div>
                    <div className='button-container'>
                        <button type='submit' className='create-spot-button'>Create Spot</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewSpot