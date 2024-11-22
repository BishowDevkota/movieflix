const express = require('express');
const { getTrendingTv ,getTvTrailers, getTvDetails,getSimilarTv, getTvByCategory} = require('../controllers/tv.controllers');
const router = express.Router();


router.get("/trending",getTrendingTv)
router.get("/:id/trailers",getTvTrailers)
router.get("/:id/details",getTvDetails)
router.get("/:id/similar",getSimilarTv)
router.get("/:category",getTvByCategory)


module.exports = router