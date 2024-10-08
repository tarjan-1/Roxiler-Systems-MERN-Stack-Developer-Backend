const Transaction = require("../models/transacation");
const axios = require("axios");

// API endpoints for fetching data from individual APIs
const barChartDataAPI = "http://localhost:3000/api/v1/bar-chart";
const pieChartDataAPI = "http://localhost:3000/api/v1/pie-chart";
const AllStatisticsDataAPI =
  "http://localhost:3000/api/v1/statistics/getAllStatistics";

const combinedDataController = async (req, res) => {
  try {
    const selectedMonth = req.query.month;

    // Make requests to all three APIs in parallel with the selected month as a query parameter
    const [barChartData, pieChartData, AllStatisticsData] = await Promise.all([
      axios.get(`${barChartDataAPI}?month=${selectedMonth}`),
      axios.get(`${pieChartDataAPI}?month=${selectedMonth}`),
      axios.get(`${AllStatisticsDataAPI}?month=${selectedMonth}`),
    ]);

    // Combine the responses into a single JSON object
    const combinedData = {
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
      AllStatisticsData: AllStatisticsData.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error occurred while fetching combined data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = combinedDataController;
