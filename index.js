import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { dbConnection } from "./db.js";
import { userRouter } from "./Routes/user.js";
import { notesRouter } from "./Routes/notes.js";
import { isAuthenticated } from "./Authetication/auth.js";



dotenv.config();

const app = express();
const PORT = 5000 || process.env.PORT

app.use(express.json())
app.use(cors())
//db connection
dbConnection()

//routes
app.use("/api/user",userRouter)
app.use("/api/notes",isAuthenticated,notesRouter)

//listen
app.listen(PORT,()=>console.log(`Server running in localhost:${PORT}`))