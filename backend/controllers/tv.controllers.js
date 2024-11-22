const fetchFromTMDB = require("../services/TMDB.services")


const getTrendingTv = async (req, res) => {
    try {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
        const randomMovie=data.results[Math.floor(Math.random()*data.results.length)]
        res.status(200).json({sucess: true, content: randomMovie})

    } catch (error) {
        console.log(error)
        res.status(500).json({sucess: false, message: "internal server error at /trending route"})
    }
}
const getTvTrailers = async (req, res) => {
    const {id}=req.params
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
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

const getTvDetails = async (req, res) => {
    const {id}=req.params
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(200).json({sucess: true, content: data})

    } catch (error) {
        console.log(error)
        if(error.response.status===404){
            return res.status(404).json({sucess: false, message: "Movie not found"})
        }
        res.status(500).json({sucess: false, message: "internal server error at /details route"})
    }
}


const getSimilarTv = async (req, res) => {
    const {id}=req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(200).json({sucess: true, content: data.results})
    } catch (error) {
        console.log(error)
        if(error.response.status===404){
            return res.status(404).json({sucess: false, message: "Movie not found"})
        }
        res.status(500).json({sucess: false, message: "internal server error at /similar route"})
        
    }
}
const getTvByCategory = async (req, res) => {
const {category}=req.params
try {
const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
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
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTv,
    getTvByCategory
}