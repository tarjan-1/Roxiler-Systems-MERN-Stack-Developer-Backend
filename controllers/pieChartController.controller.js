const Transaction = require("../models/transacation");

const pieChartController = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);

    // Aggregate pipeline to find unique categories and count of items for each category
    const aggregationPipeline = [
      {
        $match: {
          month: selectedMonth,
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ];

    const result = await Transaction.aggregate(aggregationPipeline);

    res.json(result);
  } catch (error) {
    console.error("Error occurred while fetching pie chart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = pieChartController;
