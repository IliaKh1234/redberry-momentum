import {useState, useEffect} from "react"

export default function Statuses(){
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        fetch("https://momentum.redberryinternship.ge/api/statuses")
            .then((res) => res.json())
            .then((data) => setStatuses(data))
            
    }, []);  
    
    const statusElements = statuses.map((status) => (
        <select key={status.id}>
            {status.name} 
        </select>
    ));
    return (
        <>
        </>
    );
    
    
}