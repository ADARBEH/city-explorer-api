const axios = require('axios')

async function comediamovies(req, res) {

    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://movies-app1.p.rapidapi.com/api/movies',
        params: { genres: 'comedia'},
        headers: {
            'X-RapidAPI-Key': '658d9f8a13msh6c96f2c72936bbep19c408jsnd262b59a0bab',
            'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
        }
    };


    class moviesClass {
        constructor(obj) {
            this.title = obj.title;
            this.year = obj.year;
            this.rating = obj.rating;
            this.description = obj.description;
            this.genres = obj.genres[0].name;
            this.image = `${obj.image}`  
        }
    }

    axios.request(options).then(function (response) {

        const moviearr = response.data.results.map(item => new moviesClass(item))


        res.status(200).send(moviearr)

    }).catch(function (error) {
        console.error(error);
    });

}


module.exports = { comediamovies }


