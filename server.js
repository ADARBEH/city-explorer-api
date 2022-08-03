`use strict`;

const express = require('express')
const axios =require('axios')
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors());

const port = process.env.PORT || 3005



app.get('/weather', async (req , res) =>{

    const searchQuery = req.query.searchQuery;
    const latitude = req.query.lat
    const longitude = req.query.lon
    try {

        const city = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`)
        console.log(city.data)
    
        class Forecast{
        constructor(day){
            this.data = day.valid_date;
            this.description = day.weather.description;
        }}
    
        const weatherarr = city.data.data.map(item => new Forecast(item))
        res.status(200).send(weatherarr)
        
    } catch (error) {
    res.status(500).send('your search not find')}
})





app.get('/movies', async (req , res) =>{

    const searchQuery = req.query.searchQuery;

    try {    
        const movie = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)
        
            class moviesClass{
                constructor(obj){
                    this.title=obj.original_title;
                    this.average_votes=obj.vote_average;
                    this.total_votes=obj.vote_count;
                    this.image_url =`http://image.tmdb.org/t/p/w500${obj.poster_path}`;
                }
            }
        const moviearr = movie.data.results.map(item => new moviesClass(item))
        console.log(moviearr)

        res.status(200).send(moviearr)

    } catch (error) {
        res.status(500).send('your search not find')

    }


})



app.get('*' , (req,res)=>{
    res.status(404).json({'error' : 'page not find'})
})

app.listen(port , () =>{
    console.log(`this is my port ${port}`)
})