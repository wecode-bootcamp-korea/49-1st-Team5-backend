const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const port = process.env.PORT || 3000;

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

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

//threads 목록 조회하기
//const threadsGet = async (req, res) => {
//app.post("/Users/create", async (req, res) => {
app.get("/threads", async (req, res) => {
  try {
    const threadsData = await AppDataSource.query(`SELECT threads.id, 
    users.nickname, 
    users.profile_image, 
    threads.content,  
    threads.created_at AS createdAt,
    threads.updated_at AS updatedAt
  FROM threads
  INNER JOIN users ON threads.user_id = users.id ORDER BY threads.created_at DESC
  limit 1
  `);
    console.log("threads: ", threadsData);
    console.log("TYPE OF: ", typeof threadsData);

    // 데이터X ----> 빈 배열 반환
    console.log("threadsDate length: ", threadsData.length);

    if (threadsData.length === 0) {
      return res.status(200).json([]);
    }

    threadsData.forEach(
      (thread) =>
        (thread.createdAt = thread.createdAt.toISOString().slice(2, 10))
    );

    return res.status(200).json({ threadsData });
  } catch (error) {
    console.log(error);
  }
});

const server = http.createServer(app);
const start = async () => {
  try {
    server.listen(port, () => console.log(`Server is listening on`));
  } catch (error) {
    console.error(error);
  }
};

start(); /*
module.exports = {
  threadsGet: threadsGet,
  AppDataSource: AppDataSource,
};*/
