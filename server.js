`use strict`;

const express = require('express')
const axios =require('axios')
const cors = require('cors')
require('dotenv').config();

const {handleweather} = require('./module/weather')
const {handlemovie, handlemovies} = require('./module/movies')

const app = express();
app.use(cors());

const port = process.env.PORT || 3005

app.get('/weather' , handleweather);

app.get('/movies' , handlemovies);




app.get('*' , (req,res)=>{
    res.status(404).json({'error' : 'page not find'})
})

app.listen(port , () =>{
    console.log(`this is my port ${port}`)
})