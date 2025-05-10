require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello world")
})



// MongoDB connection
connectDB();

// Create server
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})