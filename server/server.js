import express from 'express';
import mongoose from "mongoose"
import cors from 'cors'
import router from './router/router.js';
import dotenv from "dotenv"

const app = express();
app.use(cors()) 
dotenv.config();

app.use(express.urlencoded({ extended: true })) 
app.use(express.json()); 


app.use("/ducks/api", router)
  
  /* Server startup */
  async function afterWebContainerStarted() {
    console.log(`Server initialized on addr ${process.env.ADDR}`);
    console.log(`Port ${process.env.PORT} is used for server traffic`);
  
    await connectToDb();
  
    console.log("Server is ready...");
  }

/* Connect to database */
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    
    console.log(`MongoDB Connected`)
  } 
  catch (error) {
    console.log(error)
    process.exit(1)
  }
}

app.listen(process.env.PORT, afterWebContainerStarted); 
