const Transaction = require("../models/transacation");

const getTotalItemsNotSoldOfMonth = (req, res) => {
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
              { $eq: ["$sold", false] },
            ],
          },
        },
      },
      {
        $count: "totalItemsNotSold",
      },
    ])
      .then((result) => {
        console.log("Total not sold items for the desired month:", result);
        res.json({
          totalItemsNotSoldForGivenMonth: result[0]?.totalItemsNotSold,
        });
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

module.exports = getTotalItemsNotSoldOfMonth;
