import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [searchParams, setSearchParams] = useSearchParams();


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

    const employeeFromURL = searchParams.get("employee");
    if (employeeFromURL) {
      setSelectedEmployee(employeeFromURL);
      localStorage.setItem("selectedEmployee", employeeFromURL); 
    } else {
      const savedEmployee = localStorage.getItem("selectedEmployee");
      if (savedEmployee) {
        setSelectedEmployee(savedEmployee);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get("employee")) {
      setSelectedEmployee(null); 
      localStorage.removeItem("selectedEmployee"); 
    }
  }, [searchParams]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedEmployee(value);
      localStorage.setItem("selectedEmployee", value); 
    } else {
      setSelectedEmployee(null);
      localStorage.removeItem("selectedEmployee"); 
    }
  };


  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (selectedEmployee) {
      newSearchParams.set("employee", selectedEmployee); 
    } else {
      newSearchParams.delete("employee"); 
    }

    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div className="chooseEmployees filterTask">
        {employees.map((emp) => (
          <div key={emp.id}>
            <input
              type="checkbox"
              id={`emp-${emp.id}`}
              value={emp.id}
              onChange={handleCheckboxChange}
              checked={selectedEmployee === emp.id.toString()} 
            />
            <img className="avatar" src={emp.avatar} alt="" />
            {`${emp.name} ${emp.surname}`}
          </div>
        ))}
        <button className="subFilter" onClick={handleSubmit}>არჩევა</button>
      </div>
    </div>
  );
}
