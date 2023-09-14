const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const port = process.env.PORT || 8000;

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
console.log(myDataSource);
console.log("hi");
myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
//app.post("/create", createPost.createPost);
const createPost = async (req, res) => {
  try {
    // 1. 요청 정보 받아옴
    const header = req.headers;
    const post = req.body;
    const auth = header.authorization;
    const user_id = post.user_id;
    const content = post.content;

    // 2. user 정보 console.log로 확인 한 번!
    console.log("headers: ", header);
    console.log("post: ", post);
    //예외 처리 1 - 로그인하지 않은 사용자는 thread post 금지
    if (auth.length === 0) {
      // existing user 이용해서 판별`
      const error = new Error("ONLY_LOGGED_IN_USER");
      error.statusCode = 400;
      throw error;
    }
    //예외 처리 2 - content 길이가 1 이상이어야 함
    /*1. 로그인 하지 않은 사용자는 쓰레드 글을 남길 수 없습니다.*/
    if (content.length < 1) {
      const error = new Error("CONTENT_TOO_SHORT");
      error.statusCode = 400;
      throw error;
    }
    console.log("he");
    const decoded = jwt.decode(auth, { complete: true });
    console.log(decoded);
    console.log(auth);
    const createData = await myDataSource.query(
      `
     INSERT INTO threads(
       user_id,
       content
     )
     VALUES(?)
     `,
      [decoded],
      [content]
    );
    console.log("ho");
    // 4. DB data 저장 여부 확인
    console.log("created posts", createData.content);

    // 5. send response to FRONTEND
    return res.status(201).json({
      message: "post created",
    });
  } catch (err) {
    console.log(err);
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
module.exports = {
  createPost: createPost,
  myDataSource: myDataSource,
};
