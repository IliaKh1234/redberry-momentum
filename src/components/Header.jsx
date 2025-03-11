import logo from '../images/logo.png'
import hourGlass from "../images/Hourglass.png"

export default function Header(){
    return (
        <div className='header-parent'>
            <div className='logo-parent'>
                <img src={logo} alt="logo" />
                <img style={{ marginBottom: "-5px" }} src={hourGlass} alt="hourGlass" />
            </div>
            <div className='buttons'>
                <button>თანამშრომლების შექმნა</button>
                <button>+ შექმენი ახალი დავალება</button>
            </div>
        </div>
    )
}