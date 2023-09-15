<<<<<<< HEAD
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
const createPost = require("./createPost.js");
const myDataSource = new DataSource({
=======
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const morgan = require('morgan')
dotenv.config()
const port = process.env.PORT || 8000

const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
>>>>>>> e1b5a916089e10366d8d63bb56be1f106ef5b128
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
<<<<<<< HEAD
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

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to 49-1st-Team5 sever!" });
  } catch (err) {
    console.log(err);
  }
});
// Service API
app.post("/createPost", createPost.createPost);

const server = http.createServer(app);
const start = async () => {
  try {
    server.listen(port, () => console.log(`Server is listening on`));
  } catch (error) {
    console.error(error);
  }
};

start();
=======
  database: process.env.DB_DATABASE
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  });

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

app.get('/', async (req, res) => {
  try {
    return res.status(200).json({ "message": "Welcome to 49-1st-Team5 sever!" })
  } catch (err) {
    console.log(err)
  }
})

const server = http.createServer(app)
const start = async () => {
  try {
    server.listen(port, () => console.log(`Server is listening on`))
  } catch (error) {
    console.error(error)
  }
}

start()
>>>>>>> e1b5a916089e10366d8d63bb56be1f106ef5b128
