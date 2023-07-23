import { useHistory } from "react-router-dom"

function OpenModalButton({ buttonText, setShowMenu }) {
    const history = useHistory()

    const handleClick = () => {
        if (buttonText === "Log In") {
            history.push('/login')
        } else if (buttonText === "Sign Up") {
            history.push('/signup')
        }   

        setShowMenu(false)
    }

    return (
        <>
            <button onClick={handleClick}>
                {buttonText}
            </button>

        </>
    )
}


export default OpenModalButton