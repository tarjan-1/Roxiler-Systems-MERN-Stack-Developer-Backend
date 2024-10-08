const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDB = require("./utils/connectDB");
const transacationRoutes = require("./routers/transacation.routers");
const statisticsRoutes = require("./routers/statisticsRoutes.routers");
const barChartRoutes = require("./routers/barChartRoutes.router");
const pieChartRoutes = require("./routers/pieChartRoutes.router");
const combinedDataRoutes = require("./routers/combinedDataRoutes.router");

const PORT = process.env.PORT || 3000;

const app = express();

// middleware's
app.use(express.json());
app.use(cors());

// routes
app.get("/health", (req, res) => {
  res.status(200).json({ Health: "Server health is ok!" });
});
app.use("/api/v1/statistics", statisticsRoutes);
app.use("/api/v1/bar-chart", barChartRoutes);
app.use("/api/v1/pie-chart", pieChartRoutes);
app.use("/api/v1/combined-data", combinedDataRoutes);
app.use("/api/v1", transacationRoutes);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is up and running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log("error occured during connecting to database: ", error.message);
  }
};

startServer();
