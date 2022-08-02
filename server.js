`use strict`;

const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express();
app.use(cors());

const port = process.env.PORT || 3005

const jsondata = require('./data/weather.json')


app.get('/weather',(req , res) =>{
    try {
    let searchQuery = req.query.searchQuery;
    let city = jsondata.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    
    class Forecast{
        constructor(day){
            this.data = day.valid_date;
            this.description = day.weather.description;
        }
    }

    const weatherarr = city.data.map(city => new Forecast(city))
    
    res.status(200).send(weatherarr)
    
    } catch (error) {
        res.status(500).send('your search not find')
        
    }


})



// app.get('*' , (req,res)=>{
//     res.status(404).json({'error' : 'page not find'})
// })-

app.listen(port , () =>{
    console.log(`this is my port ${port}`)
})