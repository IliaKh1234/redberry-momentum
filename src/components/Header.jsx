import logo from '../images/logo.png'
import hourGlass from "../images/Hourglass.png"
import { useState, useEffect } from "react";
import AddEmployee from './taskComponents/AddEmployee';
import { useNavigate, Link } from "react-router-dom";


export default function Header(){
    const [addOpen, setAddOpen] = useState(false)
    const navigate = useNavigate()
        useEffect(() => {
            if (addOpen) {
                document.body.classList.add("modal-open");
            } else {
                document.body.classList.remove("modal-open");
            }
        }, [addOpen]);
    
        const handleAddTask = () => {
            window.location.href = '/create-task'; 
        }
        const handleLogoClick = () => {
            navigate("/"); 
          };

    return (
        <>
        <div className={`header-parent ${addOpen ? 'blur' : ''}`}>
            <div className='logo-parent'>
                <img style={{cursor: 'pointer'}} onClick={handleLogoClick} src={logo} alt="logo" />
                <img style={{ marginBottom: "-5px" }} src={hourGlass} alt="hourGlass" />
            </div>
            <div className='buttons'>
                <button onClick={() => setAddOpen((prev) => !prev)}>თანამშრომლების შექმნა</button>
                <button onClick={handleAddTask}>+ შექმენი ახალი დავალება</button>
            </div>
        </div>
            {addOpen ? (
                    <div className="create-employee-parent">
                        <AddEmployee onClose={() => setAddOpen(false)}/>
                    </div>
            ) : null}
        </>
    )
}