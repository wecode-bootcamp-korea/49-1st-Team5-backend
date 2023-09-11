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

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
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
