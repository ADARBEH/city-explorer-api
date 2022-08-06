const axios = require('axios')

const moviescache = {};


async function handlemovies (req , res) {

    const searchQuery = req.query.searchQuery;

    if(moviescache[searchQuery] !== undefined){

        res.status(200).send(moviescache[searchQuery])

    } else{
        try {    
            const movie = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`)
        
            const moviearr = movie.data.results.map(item => new moviesClass(item))

            moviescache[searchQuery] = moviearr
    
            res.status(200).send(moviearr)
    
        } catch (error) {
        res.status(500).send('your search not find')}
    }

    


}


class moviesClass{
    constructor(obj){
        this.title=obj.original_title;
        this.average_votes=obj.vote_average;
        this.total_votes=obj.vote_count;
        this.image_url =`http://image.tmdb.org/t/p/w500${obj.poster_path}`;
    }
}


module.exports ={handlemovies}
