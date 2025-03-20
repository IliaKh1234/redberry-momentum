import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Priorities() {
  const [priorities, setPriorities] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/priorities")
      .then((res) => res.json())
      .then((data) => setPriorities(data));

    const prioritiesFromURL = searchParams.getAll("priority");

    if (prioritiesFromURL.length > 0) {
      setSelectedPriorities(prioritiesFromURL); 
      localStorage.setItem("selectedPriorities", JSON.stringify(prioritiesFromURL)); 
    } else {

      setSelectedPriorities([]);  
      localStorage.removeItem("selectedPriorities");
    }
  }, [searchParams]); 

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedPriorities((prev) => {
      if (checked) {
        return [...new Set([...prev, value])]; 
      } else {
        return prev.filter((priority) => priority !== value); 
      }
    });
  };

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.delete("priority");

    selectedPriorities.forEach((priority) => {
      newSearchParams.append("priority", priority);
    });
    setSearchParams(newSearchParams);
    localStorage.setItem("selectedPriorities", JSON.stringify(selectedPriorities));
  };

  return (
    <div>
      <div className="choosePriorities filterTask">
        {priorities.map((pri) => (
          <div key={pri.id}>
            <input
              type="checkbox"
              id={`pri-${pri.id}`}
              value={pri.id} 
              onChange={handleCheckboxChange}
              checked={selectedPriorities.includes(pri.id.toString())}
            />
            {pri.name}
          </div>
        ))}
        <button className="subFilter" onClick={handleSubmit}>არჩევა</button>
      </div>
    </div>
  );
}
