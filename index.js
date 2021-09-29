const express = require("express");
const http = require("http");
const Error = require("./src/middleware/api-error-class");
const error_handler = require("./src/middleware/errorHandler");
const PORT = 9050 || process.env.PORT;

const movie = require("./src/routes/movie");
const app = express();
const logger = require("./src/logger");

// MIDDLEWARES
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({extended: true}));

// MOUNT ROUTES
app.use("/api/movie", movie);

app.use(error_handler);

// SERVER
const server = http.createServer(app);

//  Handle invalid route 
app.use('*', async(req, res, next) => next(Error.not_found('Route does not exist', false)));

server.listen(PORT, () => logger.info(`Server running on Port: ${PORT}`))