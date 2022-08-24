const axios = require('axios')

async function idmovies(req, res) {


    const axios = require("axios");

    const options = {
      method: 'GET',
      url: `https://movies-app1.p.rapidapi.com/api/movie/${req.params.id}`,
      headers: {
        'X-RapidAPI-Key': '658d9f8a13msh6c96f2c72936bbep19c408jsnd262b59a0bab',
        'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
      }
    };
   

    axios.request(options).then(function (response) {



        res.status(200).send(response.data)

    }).catch(function (error) {
        console.error(error);
    });

}


module.exports = { idmovies }


