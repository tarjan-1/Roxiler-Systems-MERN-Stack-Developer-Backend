const express = require("express");
const router = express.Router();

const populateDB = require("../controllers/populateDB.controller");
const getAllTransacations = require("../controllers/getAllTransacations.controllers");

// API endpoint to populate DB
router.get("/populateDB", populateDB);

// API endpoint for listing all transactions with search and pagination
router.get("/transactions", getAllTransacations);

module.exports = router;
