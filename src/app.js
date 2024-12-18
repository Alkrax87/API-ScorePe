const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
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
app.use("/api/teams/l1/", require("./routes/routesTeamsL1"));
app.use("/api/teams/l2/", require("./routes/routesTeamsL2"));
app.use("/api/teams/l3/", require("./routes/routesTeamsL3"));
app.use("/api/lastgames/l1/", require("./routes/routesLastGamesL1"));
app.use("/api/lastgames/l2/", require("./routes/routesLastGamesL2"));
app.use("/api/lastgames/l3/", require("./routes/routesLastGamesL3"));
app.use("/api/performance/l1/", require("./routes/routesPerformanceL1"));
app.use("/api/performance/l2/", require("./routes/routesPerformanceL2"));
app.use("/api/performance/l3/", require("./routes/routesPerformanceL3"));
app.use("/api/results/l1/", require("./routes/routesResultsL1"));
app.use("/api/results/l2/", require("./routes/routesResultsL2"));
app.use("/api/results/l3/", require("./routes/routesResultsL3"));
app.use("/api/stadiums", require("./routes/routesStadiums"));
app.use("/api/managers", require("./routes/routesManagers"));

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

module.exports = app;
