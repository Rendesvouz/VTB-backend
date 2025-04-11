const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const routes = require("./routes/index");

//const routes = require("./routes/index");
const { errorHandler } = require("./middleware/errorhandler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust to your frontend's domain if needed
    methods: ["GET", "POST"],
  },
});

// Middleware to attach io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use("/v1/api", routes);

// Global Error Handler
app.use(errorHandler);

module.exports = { app, server };
