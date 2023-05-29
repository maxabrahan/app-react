const { Winner } = require("../models/winners.model");

/**
 * @openapi
 * components:
 *   schemas:
 *     Winner:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: X
 *         date:
 *           type: string
 *           example: 14/05/2023
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */
async function getAllWinners() {
  try {
    const winners = await Winner.findAll();
    return winners;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getOneWinner = async (winnerId) => {
try{

  const winners = await Winner.findByPk(winnerId);
  return winners;
}catch (error){
  
}

};

const createNewWinner = async (newWinner) => {
  try {
    
    const winners= await Winner.create(newWinner);
    return winners;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneWinner = async (winnerId, changes) => {

  try {

    const winners= await Winner.findByPk(winnerId);
    if (winners) {
      await winners.update(changes);
      console.log('Winner updated successfully.');
    } else {
      throw { status: 404, message: 'Winner not found.' };
    }

  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneWinner = async(winnerId) => {
  try {

    const winners = await Winner.findByPk(winnerId);

    if (winners) {
      await winners.destroy();
      console.log('Winner deleted successfully.');
    } else {
      throw { status: 404, message: 'Winner not found.' };
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { getAllWinners, createNewWinner, getOneWinner, deleteOneWinner, updateOneWinner };
