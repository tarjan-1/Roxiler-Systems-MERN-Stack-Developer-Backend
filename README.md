# Roxiller-Assessment-MERN-Stack

## Table of Contents

- [Introduction](#introduction)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Introduction

Secure and scalable RESTful API that allows users to get valuable info from the data fetched from the source: [https://s3.amazonaws.com/roxiler.com/product_transaction.json] (https://s3.amazonaws.com/roxiler.com/product_transaction.json)

Ex:

1. API to get all the transactions that includes perticular keyword.

2. API for statistics

- Total sale amount of selected month
- Total number of sold items of selected month
- Total number of not sold items of selected month

3. API for bar chart (price range and the number of items in that range for the selected month regardless of the year)

- 0 - 100
- 101 - 200
- 201-300
- 301-400
- 401-500
- 501 - 600 - 601-700
- 701-800
- 801-900
- 901-above

4. API for pie chart Find unique categories and number of items from that category for the selected month regardless of the year.
   For example :

- X category : 20 (items) - Y category : 5 (items) - Z category : 3 (items)

## Technical Stack

- "@reduxjs/toolkit": "^2.2.1",
- "axios": "^1.6.7",
- "cors": "^2.8.5",
- "dotenv": "^16.4.4",
- "express": "^4.18.2",
- "mongoose": "^8.1.2",
- "mongoose-unique-validator": "^5.0.0",
- "react-redux": "^9.1.0"
- "@heroicons/react": "^2.1.1",
- "react": "^18.2.0",
- "react-dom": "^18.2.0"

## Getting Started

### Prerequisites

Ensure you have the following software installed on your machine:

- "@reduxjs/toolkit": "^2.2.1",
- "axios": "^1.6.7",
- "cors": "^2.8.5",
- "dotenv": "^16.4.4",
- "express": "^4.18.2",
- "mongoose": "^8.1.2",
- "mongoose-unique-validator": "^5.0.0",
- "react-redux": "^9.1.0"
- "@heroicons/react": "^2.1.1",
- "react": "^18.2.0",
- "react-dom": "^18.2.0"

also refer package.json for more

### Installation

Clone the repository:

bash
git clone https://github.com/tarjan-1/Roxiller-Assessment-MERN-Stack.git

Install dependencies:

cd yourproject
open two terminal instances one for frontend and other for backend
npm install

## create .env files for both frontend and backend 
ex: MONGO_URI="your_db_connection_string"

Running the Application
Start both frontend and backend server:

npm start
The Frontend application will be accessible at http://localhost:5500.
The Backend application will be accessible at http://localhost:3000.

###- API Endpoints

Populate Database Endpoints
\*\* GET http://localhost:3000/api/v1/populateDB
Populates Database with transactions data

Response:
{
"msg": "success"
}

\*\* GET http://localhost:3000/api/v1/transactions
To get all transactions from database, default pagination page: 1, records perpage: 10
support for month=Number(1 - 12) and search=String query

Response:
{
"total": 60,
"page": 1,
"perPage": 10,
"transactions": [
{
"id": "12",
"title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
"price": 798,
"description": "Expand your PS4 gaming experience Play anywhere Fast and easy setup Sleek design with high capacity 3year manufacturers limited warranty",
"category": "electronics",
"image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
"sold": true,
"dateOfSale": "2022-03-27T14:59:54.000Z"
},
{
"id": "2",
"title": "Mens Casual Premium Slim Fit TShirts ",
"price": 44.6,
"description": "Slimfitting style contrast raglan long sleeve threebutton henley placket light weight soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a threebutton placket.",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
"sold": false,
"dateOfSale": "2021-10-27T14:59:54.000Z"
}....
]

Get all statistics for given month
\*\* GET http://localhost:3000/api/v1/statistics/getAllStatistics?month=12

- Total sale amount of selected month
- Total number of sold items of selected month
- Total number of not sold items of selected month

Response:
{
"totalSaleAmount": {
"totalSalesAmountForGivenMonth": 592.96
},
"totalItemsSold": {
"totalItemsSoldForGivenMonth": 2
},
"totalItemsNotSold": {
"totalItemsNotSoldForGivenMonth": 1
}
}

Getting Barchart Creation Data as per range:

- 0 - 100
- 101 - 200
- 201-300
- 301-400
- 401-500
- 501 - 600 - 601-700
- 701-800
- 801-900
- 901-above

\*\* GET http://localhost:3000/api/v1/bar-chart?month=11
Get a note by ID for the authenticated user.

Response:
[
{
"count": 1,
"priceRange": "301-400"
},
{
"count": 3,
"priceRange": "0-100"
},
{
"count": 1,
"priceRange": "501-600"
}
]

Getting Pie Chart creation data
\*\* GET http://localhost:3000/api/v1/pie-chart?month=8

Response:
[
{
"count": 1,
"category": "jewelery"
},
{
"count": 1,
"category": "electronics"
}
]
