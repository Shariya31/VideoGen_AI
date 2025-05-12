import express from 'express'
import {serve} from 'inngest/express'
// import { inngest, functions } from './ingest'
import cors from 'cors'
import dotenv from 'dotenv'
import { inngest, functions } from './ingest/index.js';

//import routes

import videoRoutes from './routes/generateVideoRoute.js'
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

const mongoUrl = process.env.MONGO_URI || ""
connectDB(mongoUrl)

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res)=>{
  res.send("Server is up")
})

app.use('/api', videoRoutes)


const PORT = process.env.PORT || 5400
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})
