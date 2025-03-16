import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import { ka } from "date-fns/locale";

export default function TaskDetailPage() {
  const { id } = useParams(); 
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTask(data);  // Store the task details in state
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  if (!task) {
    return <p>Loading task details...</p>;
  }
  const getPriorityClass = (priority) => {
    if (priority === "დაბალი") return "low";
    if (priority === "საშუალო") return "mid";
    if (priority === "მაღალი") return "high";
    return "";
  };
  console.log(task.due_date)

  return (
    <div className='task-detail-parent'>
        <div className={`task-header-${task.id} task-header `}>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ padding: "5px 10px", borderRadius: "10px" }} className={getPriorityClass(task.priority.name)}>
                  <img src={task.priority.icon} alt="" id="priIcon" />
                  <label htmlFor="priIcon">{task.priority.name}</label>
                </div>

                <div style={{ background: '#FF66A8', padding: "5px 10px", borderRadius: "25px", color: 'white' }}>
                  {task.department.name}
                </div>
              </div>
              <div style={{ fontSize: "12px", marginTop: '8px' }}>
                {format(new Date(task.due_date), "dd MMM, yy", { locale: ka })}
              </div>
            </div>
            <div className='comments'>

            </div>
            </div>
  );
}
