const http = require("http");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const mysql = require("mysql2");

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to 49-1st-Team5 sever!" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/Users", async (req, res) => {
  try {
    const userData = await myDataSource.query(
      "SELECT id, email, password FROM USERS"
    );
    return res.status(200).json({
      USERS: "users",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/Users/create", async (req, res) => {
  try {
    const { nickname, email, password, phone_number, birth_day } = req.body;
    if (
      nickname === undefined ||
      email === undefined ||
      password === undefined ||
      phone_number === undefined ||
      birth_day === undefined
    ) {
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
    SELECT id, email FROM users WHERE email="${email}"
    `);

    if (emailCheck.length > 0) {
      const error = new Error("NOT_TRUE_EMAIL");
      error.statusCode = 400;
      throw error;
    }

    const userData = await myDataSource.query(`
        INSERT INTO users
        (
        nickname,
        email,
        password,
        phone_number,
        birth_day
        )

        VALUES
        (
        "${nickname}",
        "${email}",
        "${password}",
        "${phone_number}",
        "${birth_day}"
        )
        `);

    return res.status(201).json({
      message: "SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "ERROR_CHECK",
    });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (password.length < 10) {
      const error = new Error("PASSWORD_LENGTHERROR");
      error.statusCode = 400;
      throw error;
    }

    const DbCheck = await myDataSource.query(`
    SELECT * FROM users WHERE email="${email}" AND password = "${password}"
      `);

    console.log(DbCheck);

    if (DbCheck.length === 0) {
      const error = new Error("EMAIL_OR_PASSWORD_ERROR");
      error.statusCode = 400;
      throw error;
    }

    const loginToken = jwt.sign({ id: DbCheck[0].id }, "loginToken");

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

const start = () => {
  try {
    server.listen(8000, () => console.log(`Server is listening on 8000`));
  } catch (err) {
    console.error(err);
  }
};
myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

start();
