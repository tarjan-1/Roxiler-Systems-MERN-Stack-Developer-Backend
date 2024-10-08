const axios = require("axios");

const Transacation = require("../models/transacation");

// Define a function to populate the month field
function populateMonthField(documents) {
  documents.forEach((doc) => {
    const dateOfSale = doc.dateOfSale;
    if (dateOfSale) {
      doc.month = dateOfSale.split("-")[1];
    }
  });

  return documents;
}

const populateDB = async (req, res, next) => {
  // Fetch JSON data from the API
  axios
    .get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    .then((response) => {
      updatedResponse = populateMonthField(response.data);
      const data = updatedResponse;
      let entriesCount = 0;

      // Insert data into the database
      Transacation.insertMany(data, { upsert: true })
        .then((docs) => {
          console.log(
            "Data inserted successfully:",
            docs.length,
            "documents inserted."
          );
          entriesCount++;
          console.log(docs);
          res.json({ docs });
        })
        .catch((err) => {
          console.error(err.message);
          console.log(
            "Data inserted successfully:",
            entriesCount,
            "documents inserted."
          );
          res.status(200).json({ msg: "success" });
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

module.exports = populateDB;
