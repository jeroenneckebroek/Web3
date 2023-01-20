import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { setNestedObjectValues } from "formik";

const RapportHost = () => {
  const [rapporten, setRapporten] = useState([]);
  const [vragenStudent, setVragenStudent] = useState([]);
  const [opdrachtElementen, setOpdrachtElementen] = useState({});
  const [statussen, setStatussen] = useState([]);
  const status = {
    0: "Bezig",
    1: "Ik doe niet mee",
    2: "Ik geef op",
    3: "Klaar",
  };
  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:9000/host/rapport/${params.opdrachtElementId}`)
      .then((response) => response.json())
      .then((data) => {
        setRapporten(data);
        setVragenStudent(data.vragenStudent);
      });
  }, [params]);

  useEffect(() => {
    fetch(`http://localhost:9000/opdrachtElementen/${params.opdrachtElementId}`)
      .then((response) => response.json())
      .then((data) => {
        setOpdrachtElementen(data);
      });
  }, [params]);

  const handleStart = () => {
    fetch(
      `http://localhost:9000/opdrachtElementen/${params.opdrachtElementId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          "Access-Control-Allow-Methods":
            "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        },
        body: JSON.stringify({
          geldig: 1,
        }),
      }
    );
    alert("De opdracht is gestart");
  };

  const handleStop = () => {
    fetch(
      `http://localhost:9000/opdrachtElementen/${params.opdrachtElementId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          "Access-Control-Allow-Methods":
            "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        },
        body: JSON.stringify({
          geldig: 0,
        }),
      }
    );
    alert("De opdracht is gestopt");
  };

  return (
    <div class="student-box">
      <div class="host-row" style={{ borderBottom: "#f1cb8f 1px solid" }}>
        <h1>Rapport geslecteerd opdrachtelement</h1>
        <div class="host-row-button">
          <button onClick={handleStop}> Niet actief </button>
          <button onClick={handleStart}> Actief </button>
        </div>
      </div>

      <div class="host-row" style={{ borderBottom: "#f1cb8f 1px solid" }}>
        <h2>{opdrachtElementen?.beschrijving}</h2>
      </div>

      <div class="host-row" style={{ borderBottom: "#f1cb8f 1px solid" }}>
        {rapporten.length === 0 ? (
          <p>nog geen rapport</p>
        ) : (
          <ul>
            {rapporten.map((rapport) => {
              const statusAlsText = status[rapport.status];
              return (
                <ul key={rapport.id}>
                  <h3>Student:</h3>
                  <li>
                    {rapport.student.voorNaam} {rapport.student.familieNaam}
                  </li>
                  <h3>Status:</h3>
                  <li>{statusAlsText}</li>
                  <h3>Extra minuten:</h3>
                  <li>+ {rapport.extraMinuten} minuten</li>
                  <h3>Vragen student:</h3>
                  <li>
                    {rapport.vragenStudent.map((vraag) => {
                      return (
                        <ul key={vraag.id}>
                          <li>{vraag.beschrijving}</li>
                        </ul>
                      );
                    })}
                  </li>
                </ul>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RapportHost;
