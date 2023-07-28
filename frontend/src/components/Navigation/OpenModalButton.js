import { createContext, useState } from 'react'
import './OpenModalButton.css'

export const context = createContext(null)

function OpenModalButton({ buttonText, modalComponent }) {
    const [modal, setModal] = useState(false);

    const handleClick = () => {
        setModal(!modal);
        //hi haru 
        //setShowMenu(false)
    }



    return (
        <context.Provider value={{ setModal }}>

            <div className='button-container' onClick={() => { if (modal === false) setModal(true) }}>
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
        </context.Provider>
    )
}


export default OpenModalButton