const express = require("express");
const router = express.Router();

const combinedDataController = require("../controllers/combinedDataController.controller");

router.get("/", combinedDataController);

module.exports = router;
