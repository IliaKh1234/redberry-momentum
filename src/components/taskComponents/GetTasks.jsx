import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import commentsIcon from '../../images/Comments.png';
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GetTasks({ id, name }) {
  const [tasks, setTasks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const navigate = useNavigate();
  const [filteredDeps, setFilteredDeps] = useState([])
  const [filteredPris, setFilteredPris] = useState([])
  const [filteredEmps, setFilteredEmps] = useState([])

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((res) => res.json())
      .then((data) => setFilteredDeps(data));
  }, [searchParams])

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/priorities")
      .then((res) => res.json())
      .then((data) => setFilteredPris(data));
  }, [searchParams])

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/employees", {
      method: "GET",
      headers: {
        "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setFilteredEmps(data))
  }, [searchParams])

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/tasks", {
      method: "GET",
      headers: {
        "Authorization": `Bearer 9e685023-d697-49c2-9442-4c707290d2bf`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const departmentIdFromURL = searchParams.get("department");
        const employeeIdFromURL = searchParams.get("employee");
        const priorityFromURL = searchParams.get("priority");

        let filteredTasks = data.filter((task) => task.status.name === name);

        if (departmentIdFromURL) {
          filteredTasks = filteredTasks.filter(
            (task) => task.department.id.toString() === departmentIdFromURL
          );
        }

        if (employeeIdFromURL) {
          filteredTasks = filteredTasks.filter(
            (task) => task.employee.id.toString() === employeeIdFromURL
          );
        }

        if (priorityFromURL) {
          filteredTasks = filteredTasks.filter(
            (task) => task.priority.id.toString() === priorityFromURL
          );
        }

        setTasks(filteredTasks); 
      })
      .catch((error) => console.error("Error fetching Tasks:", error));
  }, [name, searchParams]); 

  const navigateToTaskDetail = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const abbreviateText = (text) => {
    const abbreviations = {
      "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
      "ადამიანური რესურსების დეპარტამენტი": "რესურსები",
      "ფინანსების დეპარტამენტი": "ფინანსები",
      "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
      "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
      "ტექნოლოგიების დეპარტამენტი": "ტექ",
      "მედიის დეპარტამენტი": "მედია",
    };
    return abbreviations[text] || text;
  };

  const getPriorityClass = (priority) => {
    if (priority === "დაბალი") return "low";
    if (priority === "საშუალო") return "mid";
    if (priority === "მაღალი") return "high";
    return "";
  };

  const borderChoose = (id) => {
    if (id === 1) return "#F7BC30";
    if (id === 2) return "#FB5607";
    if (id === 3) return "#FF006E";
    if (id === 4) return "#3A86FF";
  };

  const truncateDescription = (description) => {
    let formattedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;
    if (formattedDescription.length > 35) {
      return formattedDescription.substring(0, 35) + "<br/>" + formattedDescription.substring(35);
    }
    return formattedDescription;
  };

  return (
    <div>

      

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            onClick={() => navigateToTaskDetail(task.id)}
            style={{ border: `1px solid ${borderChoose(id)}` }}
            key={task.id}
            className={`task-${task.id} task`}
          >
            <div className={`task-header-${task.id} task-header`}>
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{ padding: "5px 10px", borderRadius: "10px" }}
                  className={getPriorityClass(task.priority.name)}
                >
                  <img src={task.priority.icon} alt="" id="priIcon" />
                  <label htmlFor="priIcon">{task.priority.name}</label>
                </div>

                <div
                  style={{
                    background: "#FF66A8",
                    padding: "5px 10px",
                    borderRadius: "25px",
                    color: "white",
                  }}
                >
                  {abbreviateText(task.department.name)}
                </div>
              </div>
              <div style={{ fontSize: "12px", marginTop: "8px" }}>
                {format(new Date(task.due_date), "dd MMM, yy", { locale: ka })}
              </div>
            </div>
            <div className={`task-main-${task.id} task-main`}>
              <h4>{task.name}</h4>
              <p
                style={{
                  marginTop: "10px",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: truncateDescription(task.description) }} />
              </p>
            </div>
            <div className={`task-footer-${task.id} task-footer`}>
              <div>
                <img className="avatar" src={task.employee.avatar} alt="" />
              </div>
              <div style={{ display: "flex" }}>
                <img src={commentsIcon} alt="" />
                <p style={{ fontSize: "14px", marginTop: "5px" }}>{task.total_comments}</p>
              </div>
            </div>
          </div>
          
        ))
      ) : (
        null
      )}
    </div>
  );
}
