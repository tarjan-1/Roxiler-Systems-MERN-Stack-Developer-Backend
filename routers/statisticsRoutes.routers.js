const express = require("express");
const router = express.Router();

const getTotalSalesAmtOfMonth = require("../controllers/getTotalSalesAmtOfMonth.controller");
const getTotalItemsSoldOfMonth = require("../controllers/getTotalItemsSoldOfMonth.controller");
const getTotalItemsNotSoldOfMonth = require("../controllers/getTotalItemsNotSoldOfMonth.controller");
const getAllStatisticsOfMonth = require("../controllers/getAllStatisticsOfMonth.controller");

router.get("/total-sales-amt", getTotalSalesAmtOfMonth);
router.get("/total-items-notSold", getTotalItemsNotSoldOfMonth);
router.get("/total-items-sold", getTotalItemsSoldOfMonth);
router.get("/getAllStatistics", getAllStatisticsOfMonth);

module.exports = router;
