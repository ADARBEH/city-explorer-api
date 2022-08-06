const axios =require('axios')

const weathercache = {};


async function handleweather (req , res) {

    const searchQuery = req.query.searchQuery;
    const latitude = req.query.lat
    const longitude = req.query.lon

    if (weathercache[searchQuery] !== undefined){

        res.status(200).send(weathercache[searchQuery])

    } else{

        try {

            const city = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`)
            console.log(city.data)
        
            const weatherarr = city.data.data.map(item => new Forecast(item))
            res.status(200).send(weatherarr)
            weathercache[searchQuery] = weatherarr
        } catch (error) {
        res.status(500).send('your search not find')}


    }
   
}


class Forecast{
    constructor(day){
    this.data = day.valid_date;
    this.description = day.weather.description;
    }
}


module.exports ={handleweather}