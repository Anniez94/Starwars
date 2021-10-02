const Axios = require("axios");
const { Op } = require("sequelize");
const publicIp = require("public-ip");

const Error = require("../middleware/api-error-class");
const logger = require("../logger");
const { peopleType } = require("../utils/constants");
const { filterParam } = require("../helper/index");
const Comment = require("../models/comment");


class MovieController {
  /***
   * @router  GET: api/movie/list
   * @desc    Get Movie
   * @access  Public
   * ***/

  get_movies = async (req, res, next) => {
    try {
      const movies = await Axios.get("https://swapi.dev/api/films/");

      if (movies.data.results) {
        const sortedMoviesByDate = movies.data.results
          .slice()
          .sort((a, b) => a.release_date - b.release_date);

        let sortedMoviesEpisodeId = [];
        let sortedMoviesComments = [];

        sortedMoviesByDate.map((details) => {
          sortedMoviesEpisodeId.push(details.episode_id);
          // Test Data For Comment Table
          sortedMoviesComments.push({
            comments: [{ a: "hello", b: "hi" }],
            episode_id: details.episode_id,
          });
          return sortedMoviesEpisodeId;
        });

        // UPLOADING COMMENTS IN THE DATABASE
        if (sortedMoviesEpisodeId.length) {
          const get_comments = await Comment.findOne({
            where: {
              episode_id: {
                [Op.or]: [sortedMoviesEpisodeId],
              },
            },
          });

          if (!get_comments) {
            await Comment.bulkCreate(sortedMoviesComments);
          }
        }

        return res
          .status(200)
          .json({ status: true, data: { movies: sortedMoviesByDate } });
      }
    } catch (error) {
      logger.error(error);
      next(Error.internal(`Internal server error, ${error}`, false));
    }
  };

  /***
   * @router  GET: api/movie/people/:type
   * @desc    Sort Characters By Name, Gender, Height
   * @access  Public
   * ***/

  get_people_by_type = async (req, res, next) => {
    try {
      const people = await Axios.get("https://swapi.dev/api/people");

      const { type } = req.params;

      if (!type)
        return next(Error.bad_request("Parameter is undefined", false));

      if (filterParam(peopleType, type) === false)
        return next(Error.bad_request("Parameter is invalid", false));

      if (people.data.results) {
        const sortedData = people.data.results.sort((a, b) => {
          var nameA = a[type].toUpperCase();

          var nameB = b[type].toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        return res
          .status(200)
          .json({ status: true, data: { people: sortedData } });
      }
    } catch (error) {
      logger.error(error);
      next(Error.internal(`Internal server error, "hi", ${error}`, false));
    }
  };

  /***
   * @router  GET: api/movie/people/gender/:gender
   * @desc   Filter Characters By Gender
   * @access  Public
   * ***/

  filter_people_by_gender = async (req, res, next) => {
    try {
      const people = await Axios.get("https://swapi.dev/api/people");

      const {gender} = req.params;

      if (!gender) return next(Error.bad_request("Parameter is undefined", false));

      if (people.data.results) {
        let filterGender = people.data.results.filter((result) => {return result.gender === gender});

        const height = filterGender.map(gender => { return parseInt(gender.height)});

        const total_height_calculation = height.reduce((previousValue, currentValue ) => previousValue + currentValue);
        const total_height = total_height_calculation / 30.48

        const split = () => {
            let newHeight = total_height.toFixed(2)
            let split = newHeight.toString().split(".");
            let splitOne = `${split[0]}ft`;
            let splitTwo = `${parseFloat(split[1])}inches`;
            const join = `${splitOne} ${splitTwo}` 

            return join
        }

        filterGender = {gender: filterGender, total_number_of_characters: filterGender.length, total_height_feet: split(),total_height_cm: total_height_calculation }

        return res
          .status(200)
          .json({ status: true, data: { people: filterGender} });
      }
    } catch (error) {
      logger.error(error);
      next(Error.internal(`Internal server error, ${error}`, false));
    }
  };

  /***
   * @router  GET: api/movie/comments
   * @desc    Get Comments
   * @access  Public
   * ***/

  get_comments = async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        order: [["id", "DESC"]],
        attributes: ["comments", "createdAt"],
      });

      let get_ip = await publicIp.v4();

      return res.status(200).json({ status: true, data: { comments, get_ip } });
    } catch (error) {
      logger.error(error);
      next(Error.internal(`Internal server error, ${error}`, false));
    }
  };
}

module.exports = new MovieController();
