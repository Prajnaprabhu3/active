import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

app.get('/', (req,res)=>{
    res.send('home route running successfully');
})

app.listen(process.env.PORT, ()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
})