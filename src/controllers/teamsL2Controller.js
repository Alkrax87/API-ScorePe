const TeamL2 = require("../models/TeamL2");

const getAllTeamsL2 = async (req, res) => {
  try {
    const teams = await TeamL2.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

const getTeamL2ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamL2.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el equipo" });
  }
};

const createTeamL2 = async (req, res) => {
  try {
    const newTeam = await TeamL2.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el equipo" });
  }
};

const updateTeamL2 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updatedTeam = await TeamL2.findOneAndUpdate(
      { teamId },
      req.body,
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el equipo" });
  }
};

const deleteTeamL2 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedTeam = await TeamL2.findOneAndDelete({ teamId });
    if (!deletedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el equipo" });
  }
};

module.exports = {
  getAllTeamsL2,
  getTeamL2ByTeamId,
  createTeamL2,
  updateTeamL2,
  deleteTeamL2,
};
