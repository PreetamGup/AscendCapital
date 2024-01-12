import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import connectDB, {sequelize} from "./config/dbConnection.js";
import userRouter from "./router/userRouter.js"
import todoRouter from "./router/todoRouter.js"


async function startServer(){
    
    const app= express();
    dotenv.config();
    await connectDB();
    await sequelize.sync();
    
    app.use(express.json());
    app.use(cors())
    
    
    app.use("/user",userRouter)
    app.use("/todo",todoRouter)
    
    const Port = process.env.PORT || 8080
    app.listen(Port, ()=>{
        console.log("Server running")
    })
}

startServer();
