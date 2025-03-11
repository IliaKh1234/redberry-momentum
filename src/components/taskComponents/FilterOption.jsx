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
    }
    function priShow(){
        setPri(prev => !prev)
    }
    function empShow(){
        setEmp(prev => !prev)
    }
    console.log(dep)

   return (
    <>
        <ul className="chooseFilter">
            <li onClick={depShow}>დეპარტამენტი <ChevronDown/></li>
            <li onClick={priShow}>პრიორიტეტი <ChevronDown/></li>
            <li onClick={empShow}>თანამშრომელი <ChevronDown/></li>
        </ul>
    </>
   )
};