import { useState } from 'react'
import './OpenModalButton.css'

function OpenModalButton({ buttonText, setShowMenu, modalComponent }) {
    const [modal, setModal] = useState(false);

    const handleClick = () => {
        setModal(!modal);

        //setShowMenu(false)
    }

    

    return (
        <div className='button-container' onClick={() => {if(modal===false) setModal(true)}}>
            <button className='modal-button' onClick={handleClick}>
                {buttonText}
            </button>
            {modal && (<div className='modal'>
                <div className='overlay' onClick={handleClick}></div>
                <div className='modal-content'>
                    {modalComponent}
                </div>
            </div>)}
        </div>
    )
}


export default OpenModalButton