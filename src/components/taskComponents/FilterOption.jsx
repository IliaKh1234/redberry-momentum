import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Departments from "./Departments";
import Priorities from "./Priorities";
import Employees from "./Employees";
import { ChevronDown, X} from 'lucide-react';


export default function FilterOption() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dep, setDep] = useState(false);
  const [pri, setPri] = useState(false);
  const [emp, setEmp] = useState(false);
  const [filteredDeps, setFilteredDeps] = useState([]);
  const [filteredPris, setFilteredPris] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);
  const navigate = useNavigate()
  // Fetch the data
  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => res.json())
      .then((data) => setFilteredDeps(data));
  }, []);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/priorities")
      .then((res) => res.json())
      .then((data) => setFilteredPris(data));
  }, []);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/employees", {
      method: "GET",
      headers: {
        "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFilteredEmps(data));
  }, []);

  // Manage filter toggle states
  function depShow() {
    setDep((prev) => !prev);
    setEmp(false);
    setPri(false);
  }

  function priShow() {
    setPri((prev) => !prev);
    setEmp(false);
    setDep(false);
  }

  function empShow() {
    setEmp((prev) => !prev);
    setDep(false);
    setPri(false);
  }

  // Remove filters from URL searchParams and close filter dropdowns
  function removeFilter(filterName) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(filterName);
    setSearchParams(newSearchParams);

    // Close filter dropdowns after removing filter
    setDep(false)
    setPri(false)
    setEmp(false)
  }

  // Update state based on searchParams
  useEffect(() => {
    setDep(false)
    setPri(false)
    setEmp(false)
  }, [searchParams]);

  // Render active filters
  function renderActiveFilters() {
    const filters = [];
    const departmentIdFromURL = searchParams.get("department");
    const employeeIdFromURL = searchParams.get("employee");
    const priorityFromURL = searchParams.get("priority");

    if (departmentIdFromURL && filteredDeps.length > 0) {
      const department = filteredDeps.find((dep) => dep.id.toString() === departmentIdFromURL);
      if (department) {
        filters.push({
          label: `${department.name}`,
          name: "department",
        });
      }
    }

    if (priorityFromURL && filteredPris.length > 0) {
      const priority = filteredPris.find((pri) => pri.id.toString() === priorityFromURL);
      if (priority) {
        filters.push({
          label: `${priority.name}`,
          name: "priority",
        });
      }
    }

    if (employeeIdFromURL && filteredEmps.length > 0) {
      const employee = filteredEmps.find((emp) => emp.id.toString() === employeeIdFromURL);
      if (employee) {
        filters.push({
          label: `${employee.name} ${employee.surname}`,
          name: "employee",
        });
      }
    }

    return filters.length > 0 ? (
      <div className="active-filters">
        {filters.map((filter) => (
          <div key={filter.name} className="filter-tag">
            <span onClick={() => removeFilter(filter.name)} className="filter-span">{filter.label} <X/></span>
          </div>
        ))}
        <span onClick={() => navigate('/')} className="clear-filters">გასუფთავება</span>
      </div>
    ) : null;
  }

  return (
    <>
      <div className="filters">
        <ul className="chooseFilter">
          <li className={dep ? "active" : null} onClick={depShow}>
            დეპარტამენტი <ChevronDown />
          </li>
          <li className={pri ? "active" : null} onClick={priShow}>
            პრიორიტეტი <ChevronDown />
          </li>
          <li className={emp ? "active" : null} onClick={empShow}>
            თანამშრომელი <ChevronDown />
          </li>
        </ul>

        {dep ? <Departments /> : null}
        {pri ? <Priorities /> : null}
        {emp ? <Employees /> : null}
      </div>

      {filteredDeps.length > 0 && renderActiveFilters()}
    </>
  );
}
