import { useState, useEffect } from "react";
import GetTasks from "./GetTasks";

export default function Statuses() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/statuses")
      .then((res) => res.json())
      .then((data) => setStatuses(data));
  }, []);
  return (
    <>
      <div className="statuses">
        {statuses.length > 0 ? (
          statuses.map((status) => (
            <>
            <div>
            <div key={status.id} className={`status-${status.id} status`}>
              <h3>{status.name}</h3>
            </div>
            <div className={`tasks-container tasks-container-${status.id}`}>
                <GetTasks name={status.name} id={status.id} />
              </div>
              </div>
            </>
          ))
        ) : (
          <p>Loading statuses...</p>
        )}
      </div>
    </>
  );
}

