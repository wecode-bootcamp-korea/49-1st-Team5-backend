const dotenv = require("dotenv").config();
const { DataSource } = require("typeorm");

//DB Connection via TypeORM
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

app.post("/create", async (req, res) => {
  try {
    // 1. 요청 정보 받아옴
    const header = req.header;
    const post = req.body;
    const auth = header.authorization;
    const user_id = post.user_id;
    const content = post.content;

    // 2. user 정보 console.log로 확인 한 번!
    console.log("header: ", header);
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

    const createData = await myDataSource.query(`
        INSERT INTO threads (
         user_id,
         content
        )
        VALUES (
          '${user_id}',
          '${content}', 
        )
      `);

    // 4. DB data 저장 여부 확인
    console.log("created posts", createData.user_id);

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
});
