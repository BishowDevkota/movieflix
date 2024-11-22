const express = require('express');
const { searchPerson, searchMovie, searchTv, getsearchHistory, deleteSearchHistory } = require('../controllers/search.controllers');

const router = express.Router();
router.get("/person/:query", searchPerson)
router.get("/movie/:query", searchMovie)
router.get("/tv/:query", searchTv)


router.get("/history", getsearchHistory)
router.delete("/history/:id", deleteSearchHistory)
module.exports = router