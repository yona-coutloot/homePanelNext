"use strict";

const express = require("express");
const cors = require("cors");
const routes = require("./app/routes/routes");
const app = express();

const port = process.env.PORT || 20070;
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

routes(app);

app.listen(port, () => {
  console.log("Home-Panel Backend Running on port: " + port);
});
