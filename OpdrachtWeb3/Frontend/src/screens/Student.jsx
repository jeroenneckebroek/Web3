import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Student.css";

const StudentView = () => {
  const [student, setStudent] = useState({});
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9000/student/${id}`)
      .then((response) => response.json())
      .then((student) => {
        setStudent(student);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9000/task`)
      .then((response) => response.json())
      .then((tasks) => {
        setTasks(tasks.filter(task => task.geldig === 1));
      });
  }, []);

  return (
    <div class= "student-box">
      <div class="student-row">
      <h1>Jouw opdrachten</h1>
      </div>
      <div class="student-row">
      <h2>{student.voorNaam} {student.familieNaam}</h2>
      </div>
      <div class="student-row">
        {tasks.map((task) => {    
          return (
            <ul key={task.id}>
              <div class="task-name">
              {task.naam}  
              </div>        
              <div class="student-row">
                {task.opdrachtElementen.filter(opdrachtElementen => opdrachtElementen.geldig === 1).map((element) => {
                  return (
                    <button class= "element-button" onClick={() => navigate(`/student/${student.id}/rapport/${element.id}`, {replace: true})} key={element.id} >
                      {element.beschrijving}
                    </button>
                  );
                })}
              </div>
            </ul>
          );
        }
      )}
      </div>
    </div>
  );
}

export default StudentView;
