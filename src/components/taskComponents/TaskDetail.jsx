import { useState, useEffect, use} from 'react';
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { Timer } from 'lucide-react';
import { User } from 'lucide-react';
import { Calendar } from 'lucide-react';

export default function TaskDetail({taskId}) {
  const [task, setTask] = useState(null);
  const [statuses, setStatuses] = useState([]);  

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTask(data); 
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  useEffect(() =>{
    fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 401) {
        alert("You are not authorized. Please log in again.");
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
    
    
  })


  useEffect(() => {
    fetch(`https://momentum.redberryinternship.ge/api/statuses`)
      .then((res) => res.json())
      .then((data) => setStatuses(data));  
  }, []);  

  if (!task) {
    return <p>Loading task details...</p>;
  }

  const getPriorityClass = (priority) => {
    if (priority === "დაბალი") return "low";
    if (priority === "საშუალო") return "mid";
    if (priority === "მაღალი") return "high";
    return "";
  };
  const handleStatusChange = async (e) => {
    const newStatusId = e.target.value;
  
    try {
      await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_id: newStatusId }),
      });
  
      const updatedTaskResponse = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
          "Content-Type": "application/json",
        },
      });
  
      const updatedTask = await updatedTaskResponse.json();
      setTask(updatedTask);
  
      console.log("Status updated successfully!", updatedTask);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  console.log(task)
  return (
<div className={`task-header-${task.id} task-header task-detail-header`}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ padding: "5px 10px", borderRadius: "10px" }} className={getPriorityClass(task.priority.name)}>
            <img src={task.priority.icon} alt="" id="priIcon" />
            <label htmlFor="priIcon">{task.priority.name}</label>
          </div>
          <div style={{ background: '#FF66A8', padding: "5px 10px", borderRadius: "25px", color: 'white' }}>
            {task.department.name}
          </div>
        </div>
        
        <div className='task-detail-description'>
          <h1>{task.name}</h1>
          <p style={{fontSize: '18px', lineHeight: "150%", fontWeight:"400", marginTop: '20px'}}>{task.description}</p>
          <div className='task-detail-details'>
            <h1 style={{marginBottom: "40px"}}>დავალების დეტალები</h1>
            <div style={{display: "flex"}} className='task-detail-status'>
              <div><p style={{color: '#474747'}}><Timer /> სტატუსი</p></div>
              <div style={{marginLeft: "90px"}}>
              <select 
                  style={{ color: "#474747" }} 
                  onChange={handleStatusChange} 
                  name="status" 
                  id="statusChange"
                  value={task.status.id}
                >
                  {statuses.length > 0 ? (
                    statuses.map((status) => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))
                  ) : (
                    <option>Loading statuses...</option>
                  )}
                </select>
              </div>
            </div>
            <div style={{display: "flex", margin: "30px 0"}} className='task-detail-employee'>
                <div><p style={{color: '#474747'}}><User/> თანამშრომელი</p></div>
                <div style={{display: "flex", marginLeft:"40px"}}>
                  <img style={{width: "34px", borderRadius:"20px"}} src={`${task.employee.avatar}`} alt="avatar" />
                  <div style={{marginLeft: '10px'}}>
                  <p style={{color: '#474747'}}>{task.department.name}</p>
                  <p>{task.employee.name} {task.employee.surname}</p>
                  </div>
                </div>
            </div>
            <div style={{display: "flex"}} className='task-detail-date'>
              <div><p style={{color: '#474747'}}><Calendar/> დავალების ვადა</p></div>
              <div style={{marginLeft: "40px"}}>{format(new Date(task.due_date), "EEE - dd/M/yyyy", { locale: ka })}</div>
            </div>
          </div>
        </div>
      </div>
  );
}

// unda gavaketo statusis shecvla
