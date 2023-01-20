import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Foutief email adres")
        .required("Email adres verplicht"),
      code: Yup.string().required("Toegangscode verplicht"),
    }),
    onSubmit: (values) => {
      fetch(`http://localhost:9000/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert("Error: " + data.error);
          } else {
            navigate(`/student/${data.id}`, { replace: true });
          }
        })
        .catch((error) => {
          alert("Error: der is iet fout");
        });
    },
  });

  return (
    <div class="form-box">
    <form id="loginform">
    <div class="form-row">
      <label>
        Email adres:
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </label>
      {formik.errors?.email !== undefined && (
        <p style={{ color: "red" }}>{formik.errors.email}</p>
      )}
      </div>
      <div class="form-row">
      <label>
        Toegangscode:
        <input
          type="text"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
        />
      </label>
      </div>
      <button class="button" type="submit" onClick={formik.handleSubmit}>
        Login
      </button>
      {formik.errors?.code !== undefined && (
        <p style={{ color: "red" }}>{formik.errors.code}</p>
      )}
    </form>
    </div>
  );
};

export default Login;
