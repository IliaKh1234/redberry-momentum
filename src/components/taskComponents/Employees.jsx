import {useState, useEffect} from "react"

export default function Employees(){
    const [employees, setEmployees] = useState([])
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        fetch("https://momentum.redberryinternship.ge/api/employees", {
          method: "GET",
          headers: {
            "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => setEmployees(data))
          .catch((error) => console.error("Error fetching employees:", error)); 
      }, []); 
    
      console.log(employees); 
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedEmployees((prev) =>
          checked
            ? [...prev, value] 
            : prev.filter((id) => id !== value)
        );
      };
      
      return (
        <div className="chooseEmployees">
          <div>
            {employees.map((emp) => (
              <div key={emp.id}>
                <input
                  type="checkbox"
                  id={`emp-${emp.id}`}
                  value={emp.name}  
                  onChange={handleCheckboxChange}
                  checked={selectedEmployees.includes(emp.name)}
                />
                    <img className="avatar" src={emp.avatar} alt="" />
                {`${emp.name} ${emp.surname}`}
              </div>
            ))}
          </div>
        </div>
        
        
        
      );
}