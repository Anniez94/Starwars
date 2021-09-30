const express = require("express");
const MovieController = require("../controller/movie");
const router = express.Router();

const {get_movies, get_people_by_type, get_comments, filter_people_by_gender} = MovieController;

router.get("/people/:type", get_people_by_type);

router.get("/people/gender/:gender", filter_people_by_gender);

router.get("/list", get_movies);

router.get("/comments", get_comments);

module.exports = router;