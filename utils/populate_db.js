// Import required modules
const mongoose = require('mongoose');
const axios = require('axios');

const Transcations = require('../models/transcation');

const populateDB = () => {
    // Fetch JSON data from the API
    axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
        .then(response => {
            const data = response.data;

            // Insert data into the database
            Transcations.insertMany(data)
                .then((docs) => {
                    console.log('Data inserted successfully:', docs.length, 'documents inserted.');
                }).catch((err) => {
                    console.error(err);
                })

            // Close the connection after inserting data
            db.close();
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

populateDB();

module.exports = populateDB;