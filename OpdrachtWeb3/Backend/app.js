const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");

const login = require("./routes/login.js");
const host = require("./routes/host.js");
const student = require("./routes/student.js");
const task = require("./routes/task.js");
const opdrachtElementen = require("./routes/opdrachtElementen.js");
const rapport = require("./routes/rapport.js");
const upload = require("./routes/upload.js");

const app = express();

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/login", login);
app.use("/host", host);
app.use("/student", student);
app.use("/task", task);
app.use("/opdrachtElementen", opdrachtElementen);
app.use("/rapport", rapport);
app.use("/upload", upload);

module.exports = app;
