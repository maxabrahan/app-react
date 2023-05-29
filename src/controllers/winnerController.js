const winnerService = require("../service/winnerService");

const getAllWinners = async (req, res) => {
  const { nombre } = req.query;
  try {
    const allWinners = await winnerService.getAllWinners({ nombre });
    res.status(200).send({ status: "OK", data: allWinners });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneWinner = async (req, res) => {
  const {
    params: { winnerId },
  } = req;
  if (!winnerId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':winnerId' can not be empty" },
    });
  }
  try {
    const winner = await winnerService.getOneWinner(winnerId);
    res.send({ status: "OK", data: winner });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewWinner = async (req, res) => {
  const { body } = req;
  if (!body.nombre) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "The following keys is missing or is empty in request body: 'name'",
      },
    });
    return;
  }
  const newWinner = {
    nombre: body.nombre,
  };
  try {
    const createdWinner = await winnerService.createNewWinner(newWinner);
    res.status(201).send({ status: "OK", data: createdWinner });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneWinner = async (req, res) => {
  const {
    body,
    params: { winnerId },
  } = req;
  if (!winnerId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':winnerId' can not be empty" },
    });
  }
  try {
    const updatedWinner = await winnerService.updateOneWinner(winnerId, body);
    res.send({ status: "OK", data: updatedWinner });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneWinner = async (req, res) => {
  const {
    params: { winnerId },
  } = req;
  if (!winnerId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':winnerId' can not be empty" },
    });
  }
  try {
    const deletedWinner = await winnerService.deleteOneWinner(winnerId);
    res.status(204).send({ status: "OK", data: deletedWinner });
  } catch (error) {
    res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllWinners,
  getOneWinner,
  createNewWinner,
  updateOneWinner,
  deleteOneWinner,
};
