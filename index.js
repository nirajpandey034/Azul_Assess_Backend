const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const DBConnect = require("./config/database");

const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(cors());
app.options("*", cors());

DBConnect(); //connection to db

const userRoute = require("./routes/user");
app.use("/user", userRoute);

app.use("/", (req, res) => {
  res.status(500).json({
    info: "Welcome",
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
