const Transaction = require("../models/transacation");

const getTotalItemsSoldOfMonth = (req, res) => {
  try {
    let { month } = req.query;
    month = parseInt(month);

    if (month > 12 || month <= 0) {
      return res.json({ err: "month values should be between 1 - 12" });
    }

    Transaction.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$dateOfSale" }, month] },
              { $eq: ["$sold", true] },
            ],
          },
        },
      },
      {
        $count: "totalItemsSold",
      },
    ])
      .then((result) => {
        console.log("Total sold items for the desired month:", result);
        res.json({ totalItemsSoldForGivenMonth: result[0]?.totalItemsSold });
      })
      .catch((error) => {
        console.error(
          "Error occurred while fetching total sales amount:",
          error
        );
      });
  } catch (error) {
    console.log("error occured getting total sales amount: ", error.message);
  }
};

module.exports = getTotalItemsSoldOfMonth;
