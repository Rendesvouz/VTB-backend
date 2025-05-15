const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const routes = require("./routes/index");
const { errorHandler } = require("./middleware/errorhandler");

const app = express();
const server = http.createServer(app);

// Setup Socket.io with CORS
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

// Attach io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  //"https://your-production-frontend.com", // ✅ Replace with actual frontend production URL
];

// Proper CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from origin: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Handle preflight requests
app.options("*", cors());

// Middleware setup
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/v1/api", routes);

// Global error handler
app.use(errorHandler);

module.exports = { app, server };
