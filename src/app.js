const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

// Conexión BD
const mongoDB =
  "mongodb://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASSWORD +
  "@" +
  process.env.MONGO_SERVER +
  ":" +
  process.env.MONGO_PORT +
  "/" +
  process.env.MONGO_DATABASE;

mongoose
  .connect(mongoDB)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

// Rutas
app.use("/api/division", require("./routes/routesDivisions"))
app.use("/api/map", require("./routes/routesMap"))
app.use("/api/teams", require("./routes/routesTeams"))
app.use("/api/lastgames", require("./routes/routesLastGames"))
app.use("/api/performance", require("./routes/routesPerformance"));
app.use("/api/results", require("./routes/routesResults"))
app.use("/api/stadiums", require("./routes/routesStadiums"));
app.use("/api/managers", require("./routes/routesManagers"));
app.use("/api/statistics", require("./routes/routesStatistics"));
app.use("/api/fixture", require("./routes/routesFixture"));

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;