const Transaction = require("../models/transacation");

const getBarChartData = async (req, res) => {
  try {
    const selectedMonth = parseInt(req.query.month);

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const aggregationPipeline = [
      {
        $match: {
          month: selectedMonth,
          //   sold: true,
        },
      },
      {
        $project: {
          price: 1,
        },
      },
      {
        $addFields: {
          priceRange: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }],
                  },
                  then: "0-100",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 101] },
                      { $lte: ["$price", 200] },
                    ],
                  },
                  then: "101-200",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 201] },
                      { $lte: ["$price", 300] },
                    ],
                  },
                  then: "201-300",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 301] },
                      { $lte: ["$price", 400] },
                    ],
                  },
                  then: "301-400",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 401] },
                      { $lte: ["$price", 500] },
                    ],
                  },
                  then: "401-500",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 501] },
                      { $lte: ["$price", 600] },
                    ],
                  },
                  then: "501-600",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 601] },
                      { $lte: ["$price", 700] },
                    ],
                  },
                  then: "601-700",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 701] },
                      { $lte: ["$price", 800] },
                    ],
                  },
                  then: "701-800",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price", 801] },
                      { $lte: ["$price", 900] },
                    ],
                  },
                  then: "801-900",
                },
                { case: { $gte: ["$price", 901] }, then: "901-above" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      {
        $group: {
          _id: "$priceRange",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          priceRange: "$_id",
          count: 1,
        },
      },
    ];

    const result = await Transaction.aggregate(aggregationPipeline);

    res.json(result);
  } catch (error) {
    console.error("Error occurred while fetching bar chart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getBarChartData;
