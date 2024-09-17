const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/index");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
// const app = express();
const connectDB = require("./config/connectDB");
const { server ,app } = require("./socket");

const PORT = process.env.PORT || 8080; 
const corsOptions = {
  origin: process.env.FORNTEND_URL, 
  credentials: true, 
};


app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
