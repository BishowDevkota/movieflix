const User = require("../models/users.models");
const fetchFromTMDB = require("../services/TMDB.services");

const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res
        .status(404)
        .json({ sucess: false, message: "Person not found" });
    }

    await User.findOneAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: Date.now(),
        },
      },
    });

    res.status(200).json({ sucess: true, content: data.results });
  } catch (error) {
    console.log("error at search person", error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "internal server error at /search route",
      });
  }
};
const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res
        .status(404)
        .json({ sucess: false, message: "Movie not found" });
    }

    await User.findOneAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: Date.now(),
        },
      },
    });
    res.status(200).json({ sucess: true, content: data.results });
  } catch (error) {
    console.log("error at search movie", error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "internal server error at /search route",
      });
  }
};
const searchTv = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json({ sucess: false, message: "Tv not found" });
    }

    await User.findOneAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: Date.now(),
        },
      },
    });
    res.status(200).json({ sucess: true, content: data.results });
  } catch (error) {
    console.log("error at search tv", error);
    res
      .status(500)
      .json({
        sucess: false,
        message: "internal server error at /search route",
      });
  }
};

const getsearchHistory = async (req, res) => {
  try {
    res.status(200).json({ sucess: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("error on search Hishory", error);
    res
      .send(500)
      .json({
        sucess: false,
        message: "internal server error at /search route",
      });
  }
};

const deleteSearchHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findOneAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id,
        },
      },
    });
    res.status(200).json({ sucess: true, message: "search history deleted" });
  } catch (error) {
    console.log("error on search Hishory", error);
    res
      .send(500)
      .json({
        sucess: false,
        message: "internal server error at /search route",
      });
  }
};

module.exports = {
  searchPerson,
  searchMovie,
  searchTv,
  getsearchHistory,
  deleteSearchHistory,
};
