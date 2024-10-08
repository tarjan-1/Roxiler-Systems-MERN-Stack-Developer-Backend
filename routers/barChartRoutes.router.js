const express = require("express");
const router = express.Router();

const getBarChartData = require("../controllers/getBarChartData.controller");

router.get("/", getBarChartData);

module.exports = router;
