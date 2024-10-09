const Transaction = require("../models/transacation");
const axios = require("axios");

// API endpoints for fetching data from individual APIs
const totalSaleAmountAPI = `${process.env.BACKEND_API_URL}/statistics/total-sales-amt`;
const totalItemsSoldAPI = `${process.env.BACKEND_API_URL}/statistics/total-items-sold`;
const totalItemsNotSoldAPI = `${process.env.BACKEND_API_URL}/statistics/total-items-notSold`;

const getAllStatisticsOfMonth = async (req, res) => {
  try {
    const selectedMonth = req.query.month;

    // Make requests to all three APIs in parallel with the selected month as a query parameter
    const [totalSaleAmount, totalItemsSold, totalItemsNotSold] =
      await Promise.all([
        axios.get(`${totalSaleAmountAPI}?month=${selectedMonth}`),
        axios.get(`${totalItemsSoldAPI}?month=${selectedMonth}`),
        axios.get(`${totalItemsNotSoldAPI}?month=${selectedMonth}`),
      ]);

    // Combine the responses into a single JSON object
    const combinedData = {
      totalSaleAmount: totalSaleAmount.data,
      totalItemsSold: totalItemsSold.data,
      totalItemsNotSold: totalItemsNotSold.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error occurred while fetching combined data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllStatisticsOfMonth;
