import {useState, useEffect} from "react"

export default function Departments(){
    const [departments, setDepartments] = useState([])
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    useEffect(() => {
        fetch("https://momentum.redberryinternship.ge/api/departments")
            .then((res) => res.json())
            .then((data) => setDepartments(data));
    }, []);  
    
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedDepartments((prev) =>
          checked
            ? [...prev, value] 
            : prev.filter((id) => id !== value)
        );
      };
      return (
        <div className="chooseDepartments">
          <div>
            {departments.map((dep) => (
              <div key={dep.id}>
                <input
                  type="checkbox"
                  id={`dep-${dep.id}`}
                  value={dep.name}
                  onChange={handleCheckboxChange}
                  checked={selectedDepartments.includes(dep.name)}
                />
                {dep.name}
              </div>
            ))}
          </div>
        </div>
      );
}