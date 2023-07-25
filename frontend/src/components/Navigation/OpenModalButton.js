import { useState } from 'react'
import './OpenModalButton.css'

function OpenModalButton({ buttonText, setShowMenu, modalComponent }) {
    const [modal, setModal] = useState(false);

    const handleClick = () => {
        setModal(!modal);
        console.log(modalComponent)
        //setShowMenu(false)
    }

    return (
        <>
            <button onClick={handleClick}>
                {buttonText}
            </button>
            {modal && (<div className='modal'>
                <div className='overlay' onClick={handleClick}></div>
                <div className='modal-content'>
                    {modalComponent}
                </div>
            </div>)}
        </>
    )
}


export default OpenModalButton