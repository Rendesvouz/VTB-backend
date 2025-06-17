const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.post("/employ", controller.createemployment);
router.post("/assign-truck", controller.createeassigntruck);
router.get("/employment/:id", controller.getEmploymentById);
router.put("/employment/:id", controller.updateEmployment);
router.delete("/employment/:id", controller.deleteEmployment);
router.get("/assign-truck/:id", controller.getAssignTruckById);
router.put("/assign-truck/:id", controller.updateAssignTruck);
router.delete("/assign-truck/:id", controller.deleteAssignTruck);
module.exports = router;
