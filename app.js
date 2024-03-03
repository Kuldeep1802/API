const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./router/web')
const connect_db = require("./db/conntect_db");
//fileuploader for image
const fileuploader = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors()) // for api communication in react

app.use(cookieParser())// for getting token auth

//call function of 
app.use(fileuploader({useTempFiles: true}))


app.use(express.json())

connect_db();

app.use('/api',web)


app.listen(process.env.PORT,()=>{
    console.log(`SERVER IS RUNNING ON localhost ${process.env.PORT}`)
})
