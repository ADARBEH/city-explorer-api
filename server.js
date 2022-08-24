`use strict`;

const express = require('express')
const axios =require('axios')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movies')




const { homemovies} = require('./module/homemovie')


const { accionmovies} = require('./module/accion')
const { searchmovies} = require('./module/searchmovies')
const { comediamovies} = require('./module/comedia')
const { idmovies} = require('./module/idmovies')




const app = express();
app.use(cors());

const port = process.env.PORT || 3005

app.get('' , homemovies);


app.get('/accion' , accionmovies);
app.get('/search' , searchmovies);
app.get('/comedia' , comediamovies);
app.get('/:id' , idmovies);







app.get('*' , (req,res)=>{
    res.status(404).json({'error' : 'page not find'})
})

app.listen(port , () =>{
    console.log(`this is my port ${port}`)
})