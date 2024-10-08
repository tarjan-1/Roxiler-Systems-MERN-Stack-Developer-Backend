const Transaction = require("../models/transacation");

const getTotalSalesAmtOfMonth = async (req, res) => {
  try {
    let { month } = req.query;
    month = parseInt(month);

    if (month > 12 || month <= 0) {
      return res.json({ err: "month values should be between 1 - 12" });
    }

    const result = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month],
          },
          sold: true, // Filter transactions where sold is true
        },
      },
      {
        $group: {
          _id: null,
          totalSalesAmt: { $sum: "$price" },
        },
      },
    ])
      .then((result) => {
        let totalSalesAmt = result[0]?.totalSalesAmt || 0;
        totalSalesAmt = parseFloat(totalSalesAmt.toFixed(2));

        console.log("Total sales amount for the desired month:", result);
        res.json({ totalSalesAmountForGivenMonth: totalSalesAmt });
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

module.exports = getTotalSalesAmtOfMonth;
