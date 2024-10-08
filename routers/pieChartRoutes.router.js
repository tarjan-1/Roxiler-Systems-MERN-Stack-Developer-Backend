const express = require("express");
const router = express.Router();

const pieChartController = require("../controllers/pieChartController.controller");

router.get("/", pieChartController);

module.exports = router;
