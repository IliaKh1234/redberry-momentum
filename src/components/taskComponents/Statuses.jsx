import {useState, useEffect} from "react"

export default function Statuses(){
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        fetch("https://momentum.redberryinternship.ge/api/statuses")
            .then((res) => res.json())
            .then((data) => setStatuses(data))
            
    }, []);  
    
    return (
        <>
            <div className="statuses">
            {statuses.length > 0 ? (
                statuses.map((status) => (
                    <div key={status.id} className={`status-${status.id} status`}>
                        {status.name} 
                    </div>
                ))
            ) : (
                <p>Loading statuses...</p>
            )}
            </div>
        </>
    );
    
    
}