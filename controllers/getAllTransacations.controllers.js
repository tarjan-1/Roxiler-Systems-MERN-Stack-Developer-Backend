const Transacation = require("../models/transacation");

const getAllTransacations = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    let query = {};

    // Filtering transactions based on page
    if (page && page === 0) {
      page = 1;
    }

    // Filtering transactions based on month
    if (month !== "undefined") {
      query.month = month;
    }

    // Searching transactions based on search text
    if (search) {
      if (search.length > 0) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: parseFloat(search) || 0 },
        ];
      }
    }

    // Count total matching transactions
    const totalCount = await Transacation.countDocuments(query);

    // Paginate transactions
    const transactions = await Transacation.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    // Transforming data to match the given format
    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction.id,
      title: transaction.title,
      price: transaction.price,
      description: transaction.description,
      category: transaction.category,
      image: transaction.image,
      sold: transaction.sold,
      dateOfSale: transaction.dateOfSale,
    }));

    res.json({
      total: totalCount,
      page,
      perPage,
      transactions: formattedTransactions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllTransacations;
