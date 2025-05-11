import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

app.get('/', (req, res)=>{
  res.send("Server is up")
})

const PORT = process.env.PORT || 5400
app.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})
