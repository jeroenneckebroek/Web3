import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Admin.css"
import Papa from 'papaparse';

const AdminView = () => {
  const [csv, setCsv] = useState([]);

  const handleFileSelect = (e) => {
  const file = e.target.files[0];
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      setCsv(results.data);
    },
  }); 
};
  const handleOpdrachtUpload = async () => {
  const response = await fetch(`http://localhost:9000/upload/opdrachten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(csv),
  }
  );
  const data = await response.json();
};

  const handleStudentUpload = async () => {
  const response = await fetch(`http://localhost:9000/upload/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(csv),
  }
  );
  const data = await response.json();
};
  
  const columns = [
    { field: "id", headerName: "Element ID", width: 150 },
    { field: "naam", headerName: "Element naam", width: 150 },
    { field: "beschrijving", headerName: "Beschrijving", width: 250 },
    { field: "opdrachtId", headerName: "Opdracht ID", width: 150 },
    { field: "geldig", headerName: "Geldig", width: 150 },
  ];

  const [opdrachtElementId, setOpdrachtElementId] = useState([]);
  const [opdrachtelementIdForm, setOpdrachtElementIdForm] = useState("");
  const [opdrachtelement, setOpdrachtelement] = useState([]);
  const [beschrijving, setBeschrijving] = useState([]);
  const [opdrachtId, setOpdrachtId] = useState([]);
  const [opdrachtnaam, setOpdrachtnaam] = useState([]);
  const [geldig, Setgeldig] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/opdrachtElementen`)
      .then((response) => response.json())
      .then((element) => {
        setOpdrachtElementId(element);
        setOpdrachtelement(element.opdrachtElementen);
        setBeschrijving(element.beschrijving);
        setOpdrachtId(element.opdrachtId);
        setOpdrachtElementIdForm(element.opdrachtElementId);
      });
  }, []);

  const handleSubmit = (event, action) => {
    event.preventDefault();
    if (action === "add") {
      fetch("http://localhost:9000/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          naam: opdrachtnaam,
          opdrachtElementen: opdrachtelement,
          beschrijving: beschrijving,
        }),
      });
    } else if (action === "delete") {
      fetch("http://localhost:9000/task/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          "Access-Control-Allow-Methods":
            "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        },
        body: JSON.stringify({
          id: opdrachtId,
        }),
      });
    } else if (action === "update") {
      fetch("http://localhost:9000/task/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
          "Access-Control-Allow-Methods":
            "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH",
        },
        body: JSON.stringify({
          id: opdrachtId,
          naam: opdrachtnaam,
          opdrachtElementen: opdrachtelement,
          beschrijving: beschrijving,
          geldig: geldig,
          opdrachtElementId: opdrachtelementIdForm,
        }),
      });
    }
  };

  return (
    <div class="student-box">
      <div style={{ height: 600, width: "90%" }}>
        <DataGrid class="admin-grid" rows={opdrachtElementId} columns={columns} />
      </div>
      <div >
      <form onSubmit={(event) => handleSubmit(event, "add")}>
        <label>
          OpdrachtElementId:
          <input
            type="text"
            value={opdrachtelementIdForm}
            onChange={(event) => setOpdrachtElementIdForm(event.target.value)}
          />
        </label>
        <br />
        <label>
          OpdrachtId:
          <input
            type="text"
            value={opdrachtId}
            onChange={(event) => setOpdrachtId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Opdrachtnaam:
          <input
            type="text"
            value={opdrachtnaam}
            onChange={(event) => setOpdrachtnaam(event.target.value)}
          />
        </label>
        <br />
        <label>
          Opdrachtelement:
          <input
            type="text"
            value={opdrachtelement}
            onChange={(event) => setOpdrachtelement(event.target.value)}
          />
        </label>
        <br />
        <label>
          Geldig:
          <input
            type="text"
            value={geldig}
            onChange={(event) => Setgeldig(event.target.value)}
          />
        </label>
        <br />
        <label>
          Beschrijving:
          <input
            type="text"
            value={beschrijving}
            onChange={(event) => setBeschrijving(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={(event) => handleSubmit(event, "add")}>
          Toevoegen
        </button>
        <button
          type="submit"
          onClick={(event) => handleSubmit(event, "delete")}
        >
          Verwijderen
        </button>
        <button
          type="submit"
          onClick={(event) => handleSubmit(event, "update")}
        >
          Bijwerken
        </button>
      </form>
      </div>
      <div className="upload">
      <ul>
        <h1>Upload Opdrachten en studenten</h1>
          <h2>Upload opdrachten</h2>
          <input type="file" onChange={handleFileSelect} /><button onClick={handleOpdrachtUpload}>Upload</button>
          <br></br>
          <h2>Upload studenten</h2>
          <input type="file" onChange={handleFileSelect} /><button onClick={handleStudentUpload}>Upload</button>
      </ul>
    </div>
      {/* <Upload /> */}
    </div>
  );
};

export default AdminView;