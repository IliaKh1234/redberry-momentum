import logo from '../images/logo.png'
import hourGlass from "../images/Hourglass.png"
import { useState, useEffect } from "react";
import AddEmployee from './taskComponents/AddEmployee';

export default function Header(){
    const [addOpen, setAddOpen] = useState(false)
        console.log(addOpen)
        useEffect(() => {
            if (addOpen) {
                document.body.classList.add("modal-open");
            } else {
                document.body.classList.remove("modal-open");
            }
        }, [addOpen]);
    return (
        <>
        <div className={`header-parent ${addOpen ? 'blur' : ''}`}>
            <div className='logo-parent'>
                <img src={logo} alt="logo" />
                <img style={{ marginBottom: "-5px" }} src={hourGlass} alt="hourGlass" />
            </div>
            <div className='buttons'>
                <button onClick={() => setAddOpen((prev) => !prev)}>თანამშრომლების შექმნა</button>
                <button>+ შექმენი ახალი დავალება</button>
            </div>
        </div>
            {addOpen ? (
                        <div className="create-employee-parent" onClick={(e) => e.stopPropagation()}>
                            <AddEmployee onClose={() => setAddOpen(false)}/>
                    </div>
            ) : null}
        </>
    )
}