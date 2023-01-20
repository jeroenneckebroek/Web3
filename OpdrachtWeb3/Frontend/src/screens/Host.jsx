import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Host.css";

const HostView = () => {
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9000/task")
      .then((response) => response.json())
      .then((task) => setTask(task));
  }, []);

  return (
    <div class="host-box">
      <div class="host-row"><h1>Alle opdrachten</h1></div>
      <div class="host-row"></div><h3>{task.naam}</h3>
      {task.map && (
        <div class="student-row">
          {task.map((task) => (
            <ul key={task.id}>
              {task.naam}
              <div class="student-row">
                {task.opdrachtElementen.map((element) => (
                  <button
                    onClick={() =>
                      navigate(`/host/rapport/${element.id}`, { replace: true })
                    }
                    key={element.id}
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                    {element.beschrijving}
                  </button>
                ))}
              </div>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostView;