import {useState, useEffect} from "react"

export default function Priorities(){
    const [priorities, setPriorities] = useState([])
    const [selectedPriorities, setSelectedPriorities] = useState([]);

    useEffect(() => {
        fetch("https://momentum.redberryinternship.ge/api/priorities")
            .then((res) => res.json())
            .then((data) => setPriorities(data));
    }, []);  
    
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedPriorities((prev) =>
          checked
            ? [...prev, value] 
            : prev.filter((id) => id !== value)
        );
      };
      return (
        <div className="choosePriorities filterTask">
          <div>
            {priorities.map((pri) => (
              <div key={pri.id}>
                <input
                  type="checkbox"
                  id={`pri-${pri.id}`}
                  value={pri.name}
                  onChange={handleCheckboxChange}
                  checked={selectedPriorities.includes(pri.name)}
                />
                {pri.name}
              </div>
            ))}
          </div>
        </div>
      );
}