import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch department data
  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => res.json())
      .then((data) => setDepartments(data));

    const departmentsFromURL = searchParams.getAll("department");

    if (departmentsFromURL.length > 0) {
      setSelectedDepartments(departmentsFromURL);
    } else {
      setSelectedDepartments([]);
    }
  }, [searchParams]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedDepartments((prev) => {
      if (checked) {
        return [...new Set([...prev, value])];
      } else {
        return prev.filter((department) => department !== value);
      }
    });
  };

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("department");

    selectedDepartments.forEach((department) => {
      newSearchParams.append("department", department);
    });
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div className="chooseDepartments filterTask">
        {departments.map((dep) => (
          <div key={dep.id}>
            <input
              type="checkbox"
              id={`dep-${dep.id}`}
              value={dep.id} 
              onChange={handleCheckboxChange}
              checked={selectedDepartments.includes(dep.id.toString())} 
            />
            {dep.name}
          </div>
        ))}
        <button className="subFilter" onClick={handleSubmit}>
          არჩევა
        </button>
      </div>
    </div>
  );
}
