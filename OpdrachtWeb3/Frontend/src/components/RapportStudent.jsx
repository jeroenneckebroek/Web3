import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Rapport = () => {


  const { id, opdrachtElementId } = useParams();
  const [opdrachtElement, setOpdrachtElement] = useState([]);
  const [vragen, setVragen] = useState([]);
  const [rapport, setRapport] = useState([]);
  const [teller, setTeller] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:9000/student/${id}/rapport/${opdrachtElementId}`)
      .then((response) => response.json())
      .then((rapport) => {
        setRapport(rapport);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:9000/opdrachtElementen/${opdrachtElementId}`)
      .then((response) => response.json())
      .then((opdrachtElement) => {
        setOpdrachtElement(opdrachtElement);
        setTeller(opdrachtElement.minuten * 60);
      });
  }, []);

  const handleStatus = (newStatus) => {
    fetch(`http://localhost:9000/rapport/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: newStatus,
        id: rapport.id,
      }),

      method: "POST",
    });
  };
  const handleExtraTijd = (extraTime) => {
    fetch(`http://localhost:9000/rapport/extraMinuten`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extraMinuten: extraTime,
        id: rapport.id,
      }),
      method: "POST",
    });
  };
  const handleVragen = (vraag) => {
    fetch(`http://localhost:9000/rapport/vragen`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        beschrijving: vraag,
        id: rapport.id,
      }),
      method: "POST",
    });
    setVragen([...vragen, { beschrijving: vraag }]);
  };

  useEffect(() => {
    if (teller > 0) {
      const timer = setInterval(() => {
        setTeller(teller - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  return (
    <div class="student-box">
      <div class="student-row" style={{borderBottom: "#f1cb8f 1px solid"}}>
        <h1>Opdract</h1>
      </div>
      <div class="student-row" style={{borderBottom: "#f1cb8f 1px solid"}}>
        <h2>{opdrachtElement.beschrijving}</h2>
      </div>
      <section>
        <div class="student-row">
          <h2>Tijd opdracht</h2>
          tijd: {teller} sec / {opdrachtElement.minuten * 60} sec
        </div>
      </section>

      <section>
        <div class="student-row">
          <h2>Extra tijd</h2>
        </div>
        <div class="student-extra">
          <button onClick={() => handleExtraTijd(1)}>+ 1min</button>
          <button onClick={() => handleExtraTijd(5)}>+ 5min</button>
          <button onClick={() => handleExtraTijd(10)}>+ 10min</button>
        </div>
      </section>

      <section>
        <div class="student-row">
        <h2>Status</h2>
          <div>
            <input
              type="radio"
              id="todo"
              name="status"
              onChange={() => handleStatus(0)}
            />
            <label>Bezig</label>
            <input
              type="radio"
              id="todo"
              name="status"
              onChange={() => handleStatus(1)}
            />
            <label>Ik doe niet mee</label>
            <input
              type="radio"
              id="todo"
              name="status"
              onChange={() => handleStatus(2)}
            />
            <label>Ik geef op</label>
            <input
              type="radio"
              id="todo"
              name="status"
              onChange={() => handleStatus(3)}
            />
            <label>Klaar</label>
          </div>
        </div>
      </section>

      <section>
        <div class="student-row">
        <h2>Vragen</h2>
        <div class="student-vraag">
        <ul>
          {vragen.map((vraag) => (
            <li key={vraag.id}>{vraag.beschrijving}</li>
          ))}
        </ul>
        <input
          type="text"
          id="vraag"
          name="vraag"
          placeholder="Stel je vraag"
        ></input>
        <button
          onClick={() => handleVragen(document.getElementById("vraag").value)}
        >
          Submit
        </button>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Rapport;
