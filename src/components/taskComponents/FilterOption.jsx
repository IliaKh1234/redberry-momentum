import {useState, useEffect} from "react"
import Departments from "./Departments";
import Priorities from "./Priorities";
import Employees from "./Employees";
import { ChevronDown } from 'lucide-react';


export default function FilterOption(){
    const [dep, setDep] = useState(false)
    const [pri, setPri] = useState(false)
    const [emp, setEmp] = useState(false)


    function depShow(){
        setDep(prev => !prev)
        setEmp(false)
        setPri(false)
    }
    function priShow(){
        setPri(prev => !prev)
        setEmp(false)
        setDep(false)
    }
    function empShow(){
        setEmp(prev => !prev)
        setDep(false)
        setPri(false)
    }
    console.log(dep)

   return (
    <>
    
    <div className="filters">
        <ul className="chooseFilter">
            <li className={dep ? "active" : null} onClick={depShow}>დეპარტამენტი <ChevronDown/></li>
            <li className={pri ? "active" : null} onClick={priShow}>პრიორიტეტი <ChevronDown/></li>
            <li className={emp ? "active" : null} onClick={empShow}>თანამშრომელი <ChevronDown/></li>
        </ul>
        {dep ? <Departments /> : null}
        {pri ? <Priorities /> : null}
        {emp ? <Employees /> : null}
        </div>
    </>
   )
};