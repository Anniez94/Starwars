const express = require("express");
const http = require("http");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const Error = require("./src/middleware/api-error-class");
const error_handler = require("./src/middleware/errorHandler");
const cors_middleware = require("./src/cors");
const PORT = 9050 || process.env.PORT;
const app = express();

const movie = require("./src/routes/movie");
const logger = require("./src/logger");

// MIDDLEWARES
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({extended: true}));
app.use('*', cors_middleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// MOUNT ROUTES
app.use("/api/movie", movie);

app.use(error_handler);

// SERVER
const server = http.createServer(app);

// Home page route
app.get('/', (req, res) => {
    res.status(200).json(
      {
          status: true,
          msg: 'Welcome to Starwars'      
      }
    );
  });


//  Handle invalid route 
app.use('*', async(req, res, next) => next(Error.not_found('Route does not exist', false)));

server.listen(PORT, () => logger.info(`Server running on Port: ${PORT}`))