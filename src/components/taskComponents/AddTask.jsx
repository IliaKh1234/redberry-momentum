import { useState, useEffect } from "react";
import useTaskValidation from '../../hooks/useTaskValidation'; 
import Select from "react-select"; 

export default function AddTask() {
    const [priorities, setPriorities] = useState([]);
    const [status, setStatus] = useState([]);
    const [department, setDepartment] = useState([]);
    const [employee, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]); 
    const [selectedDepartment, setSelectedDepartment] = useState(""); 
    const [formData, setFormData] = useState({
        taskTitle: "",
        taskDescription: "",
        choosePriority: "2",
        chooseStatus: "1",
        chooseDepartment: "",
        chooseEmployeeFor: "",
        deadLine: ""
    });
    const { labelColors, validate } = useTaskValidation(); 

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,  
        }));
        validate(id, value);  
    };

    const handleDepartmentChange = (e) => {
        const { value } = e.target;
        setSelectedDepartment(value); 
        const filtered = employee.filter((emp) => emp.department.id === parseInt(value)); 
        setFilteredEmployees(filtered); 
        setFormData((prevData) => ({
            ...prevData,
            chooseDepartment: value,  
        }));
    };

    const handlePriorityChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            choosePriority: selectedOption.value
        }));
    };

    const handleStatusChange = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            chooseStatus: selectedOption.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.chooseEmployeeFor === ""){
            alert("აირჩიეთ თანამშრომელი");
        }
    };

    useEffect(() => {
        fetch("https://momentum.redberryinternship.ge/api/priorities")
            .then((res) => res.json())
            .then((data) => setPriorities(data));

        fetch("https://momentum.redberryinternship.ge/api/statuses")
            .then((res) => res.json())
            .then((data) => setStatus(data));

        fetch("https://momentum.redberryinternship.ge/api/departments")
            .then((res) => res.json())
            .then((data) => setDepartment(data));

        fetch("https://momentum.redberryinternship.ge/api/employees", {
            method: "GET",
            headers: {
                "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data);
                setFilteredEmployees(data); 
            });
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedDate = tomorrow.toISOString().split('T')[0]; 
            setFormData((prevData) => ({
                ...prevData,
                deadLine: formattedDate 
            }));
    }, []);


    const priorityOptions = priorities.map((priority) => ({
        value: priority.id,
        label: priority.name,
        icon: priority.icon 
    }));

    const statusOptions = status.map((stat) => ({
        value: stat.id,
        label: stat.name
    }));

    const customPriorityOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                <img src={data.icon} alt={data.label} style={{ width: '20px', marginRight: '10px' }} />
                {data.label}
            </div>
        );
    };

    return (
        <div className="create-task-parent">
            <h1 style={{ margin: "20px 0 30px 120px" }}>შექმნი ახალი დავალება</h1>
            <div className="create-task-box">
                <form onSubmit={handleSubmit}>
                    <div className="add-task-parent">
                        <div>
                            <div className="task-title-parent">
                                <label htmlFor="taskTitle" style={{ color: '#343A40' }}>
                                    სათაური*
                                </label>
                                <input
                                    type="text"
                                    id="taskTitle"
                                    required
                                    minLength="3"
                                    maxLength="255"
                                    onChange={handleChange}
                                    value={formData.taskTitle}
                                />
                                <label
                                    htmlFor="taskTitle"
                                    style={{ color: labelColors.titleMinLength }}
                                >
                                    მინიმუმ 3 სიმბოლო
                                </label>
                                <label
                                    htmlFor="taskTitle"
                                    style={{ color: labelColors.titleMaxLength }}
                                >
                                    მაქსიმუმ 255 სიმბოლო
                                </label>
                            </div>
                            <div className="task-description-parent">
                                <label htmlFor="taskDescription" style={{ color: '#343A40' }}>
                                    აღწერა*
                                </label>
                                <textarea
                                    id="taskDescription"
                                    required
                                    minLength="4"
                                    maxLength="255"
                                    onChange={handleChange}
                                    rows="4"
                                    cols="50"
                                    value={formData.taskDescription}
                                />
                                <label
                                    htmlFor="taskDescription"
                                    style={{ color: labelColors.descriptionMinLength }}
                                >
                                    მინიმუმ 4 სიმბოლო
                                </label>
                                <label
                                    htmlFor="taskDescription"
                                    style={{ color: labelColors.descriptionMaxLength }}
                                >
                                    მაქსიმუმ 255 სიმბოლო
                                </label>
                            </div>
                            <div style={{ display: "flex", gap: '30px' }}>
                                <div className="priority-parent">
                                    <label style={{ color: '#343A40' }} htmlFor="choosePriority">
                                        პრიორიტეტი*
                                    </label>
                                    <Select
                                        id="choosePriority"
                                        options={priorityOptions}
                                        onChange={handlePriorityChange}
                                        value={priorityOptions.find(option => option.value === formData.choosePriority) || priorityOptions[1]} 
                                        required
                                        getOptionLabel={(e) => (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={e.icon} alt={e.label} style={{ width: '20px', marginRight: '10px' }} />
                                                {e.label}
                                            </div>
                                        )}
                                        defaultValue={priorityOptions[1]}
                                    />
                                </div>
                                <div className="choose-status-parent">
                                    <label style={{ color: '#343A40' }} htmlFor="chooseStatus">
                                        სტატუსი*
                                    </label>
                                    <Select
                                        id="chooseStatus"
                                        options={statusOptions}
                                        onChange={handleStatusChange}
                                        value={statusOptions.find(option => option.value === formData.chooseStatus) || statusOptions[0]} 
                                        required
                                        defaultValue={statusOptions[0]} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="choose-department-parent">
                                <label htmlFor="chooseDepartment" style={{ color: '#343A40' }}>
                                    დეპარტამენტი*
                                </label>
                                <select
                                    id="chooseDepartment"
                                    required
                                    onChange={handleDepartmentChange}
                                    value={selectedDepartment}
                                >
                                    <option value="">აირჩიეთ დეპარტამენტი</option>
                                    {department.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="choose-employee-parent">
                                <label htmlFor="chooseEmployeeFor" style={{ color: '#343A40' }}>
                                    პასუხისმგებელი თანამშრომელი
                                </label>
                                <select
                                    id="chooseEmployeeFor"
                                    onChange={handleChange}
                                    disabled={selectedDepartment === ""}
                                    value={formData.chooseEmployeeFor}
                                >
                                    <option value="" disabled selected hidden>
                                        აირჩიე თანამშრომელი
                                    </option>

                                    {filteredEmployees.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.name} {emp.surname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="deadLine-parent">
                                <label htmlFor="deadLine" style={{ color: '#343A40' }}>
                                    დედლაინი
                                </label>
                                <input
                                    type="date"
                                    id="deadLine"
                                    onChange={handleChange}
                                    value={formData.deadLine}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="create-task-btn" type="submit">დავალების შექმნა</button>
                </form>
            </div>
        </div>
    );
}
