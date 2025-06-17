const { Employment, AssignTruck } = require("./model");

/**
 * assign truck .
 */
async function createAssigntruck(AssignTruckData) {
  return await AssignTruck.create(AssignTruckData);
}

/**
 * Creates a new car offering.
 */
async function createEmployment(createEmployment) {
  return await Employment.create(createEmployment);
}

async function getemploymentId(employmentId) {
  return await Employment.findOne({ where: { id: employmentId } });
}

async function getassigntruckId(assignId) {
  return await AssignTruck.findOne({ where: { id: assignId } });
}

/**
 * Updates employment by its ID.
 */
async function updateemployment(employmentId, updateData) {
  const employment = await Employment.findByPk(employmentId);
  if (!employment) throw new Error("Car offering not found");
  return await employment.update(updateData);
}

/**
 * Updates assigntruck by its ID.
 */
async function updateassigntruck(assignId, updateData) {
  const assign = await AssignTruck.findByPk(assignId);
  if (!assign) throw new Error("Car offering not found");
  return await assign.update(updateData);
}

async function deleteemployment(employmentId) {
  const offering = await Employment.findByPk(employmentId);
  if (!offering) {
    throw new Error(" employment not found");
  }
  await offering.destroy();
  return true;
}

async function deleteassigntruck(assignId) {
  const offering = await AssignTruck.findByPk(assignId);
  if (!offering) {
    throw new Error("Car offering not found");
  }
  await offering.destroy();
  return true;
}

module.exports = {
  getassigntruckId,
  updateemployment,
  updateassigntruck,
  deleteemployment,
  deleteassigntruck,
  getemploymentId,
  createEmployment,
  createAssigntruck,
};
