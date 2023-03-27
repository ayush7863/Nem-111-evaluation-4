const express=require("express")
const { connection } = require("./db")
const { Authentication } = require("./middleware/post.middleware")
const { postRouter } = require("./routes/post.routes")
const { userRouter } = require("./routes/user.routes")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(Authentication)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to db")
        console.log("Server is Running on 8000 port")
        
    } catch (error) {
        console.log(error)
        
    }
    
})