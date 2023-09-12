const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const { DataSource } = require("typeorm");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.get("/home", async (req, res) => {
  try {
    return res.status(200).json({
      message: "team5 home Server! ",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (name === undefined || email === undefined || password === undefined) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 10) {
      const error = new Error("PASSWORD_LENGTH_ERROR");
      error.statusCode = 400;
      throw error;
    }

    if (!email.includes("@") && !email.includes(".")) {
      const error = new Error("@ or . NO_HAVE");
      error.statisCode = 400;
      throw error;
    }

    const emailCheck = await myDataSource.query(`
        SELECT name, email, password FROM users WHERE email="${email}"
        `);

    if (emailCheck.length > 0) {
      const error = new Error("NOT_TRUE_EMAIL");
      error.statusCode = 400;
      throw error;
    }

    const userData = await myDataSource.query(`
        INSERT INTO users
        (
        name,
        email,
        password
        )

        VALUES
        (
        "${name}",
        "${email}",
        "${password}")
        `);

    return res.status(201).json({
      message: "crate user!",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "ERROR_CHECK",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 10) {
      const error = new Error("PASSWORD_LENGTHERROR");
      error.statusCode = 400;
      throw error;
    }

    const DbCheck = await myDataSource.query(`
      SELECT * FROM users WHERE email = "${email}" AND password = "${password}"
      `);

    console.log(DbCheck);

    if (DbCheck.length === 0) {
      const error = new Error("EMAIL_OR_PASSWORD_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const loginToken = jwt.sign({ id: userCheck[0].id }, "loginToken");

    return res.status(200).json({
      message: "login complete",
      token: loginToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "login failed, check your EMAIL or PW plz",
    });
  }
});

const server = http.createServer(app);

const start = async () => {
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`));
  } catch (err) {
    console.error(err);
  }
};

start();
