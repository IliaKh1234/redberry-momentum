import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import commentsIcon from '../../images/Comments.png';

export default function GetTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/tasks", {
      method: "GET",
      headers: {
        "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching Tasks:", error));
  }, []);

  const abbreviateText = (text) => {
    const abbreviations = {
      "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
      "ადამიანური რესურსების დეპარტამენტი": "რესურსები",
      "ფინანსების დეპარტამენტი": "ფინანსები",
      "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
      "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
      "ტექონოლოგიების დეპარტამენტი": "ტექ",
      "მედიის დეპარტამენტი": "მედია",
    };

    return abbreviations[text] || text;
  };

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={`task-${task.id} task`}>
            <div className={`task-header-${task.id} task-header`}>
              <div>
                <img src={task.priority.icon} alt="" id="priIcon" />
                <label htmlFor="priIcon">{task.priority.name}</label>
                {abbreviateText(task.department.name)} 
              </div>
              <div>
                {format(new Date(task.due_date), "dd MMM yy", { locale: ka })}
              </div>
            </div>
            <div className={`task-main-${task.id} task-main`}>
              <h4>{task.name}</h4>
              <p>{task.description}</p>
            </div>
            <div className={`task-footer-${task.id} task-footer`}>
              <div>
                <img className="avatar" src={task.employee.avatar} alt="" />
              </div>
              <div style={{ display: "flex" }}>
                <img src={commentsIcon} alt="" /> <p>{task.total_comments}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading Tasks...</p>
      )}
    </>
  );
}
