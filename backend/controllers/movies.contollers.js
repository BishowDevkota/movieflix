const fetchFromTMDB = require("../services/TMDB.services")


const getTrendingMovie = async (req, res) => {
    try {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        const randomMovie=data.results[Math.floor(Math.random()*data.results.length)]
        res.status(200).json({sucess: true, content: randomMovie})

    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message: "internal server error at /trending route"})
    }
}
const getMovieTrailers = async (req, res) => {
    const {id}=req.params
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        const trailer=data.results
        res.status(200).json({sucess: true, trailer})
    } catch (error) {
        console.log(error)
        if(error.response.status===404){
            return res.status(404).json({sucess: false, message: "Movie not found"})
        }
        res.status(500).json({sucess: false, message: "internal server error at /trailers route"})
        
    }
}

const getMovieDetails = async (req, res) => {
    const {id}=req.params
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({sucess: true, content: data})

    } catch (error) {
        console.log(error)
        if(error.response.status===404){
            return res.status(404).json({sucess: false, message: "Movie not found"})
        }
        res.status(500).json({sucess: false, message: "internal server error at /details route"})
    }
}


const getSimilarMovies = async (req, res) => {
    const {id}=req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({sucess: true, content: data.results})
    } catch (error) {
        console.log(error)
        if(error.response.status===404){
            return res.status(404).json({sucess: false, message: "Movie not found"})
        }
        res.status(500).json({sucess: false, message: "internal server error at /similar route"})
        
    }
}
const getMoviesByCategory = async (req, res) => {
const {category}=req.params
try {
const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
res.status(200).json({sucess: true, content: data.results})
} catch (error) {
    console.log(error)
    if(error.response.status===404){
        return res.status(404).json({sucess: false, message: "Movie not found"})
    }
    res.status(500).json({sucess: false, message: "internal server error at /category route"})
}

}

module.exports = {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMoviesByCategory
}