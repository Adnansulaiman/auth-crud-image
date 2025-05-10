require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello world")
})


// Create server
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})