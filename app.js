const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Apply routes to App
const version = "/api/1.0";
const router = require("./router");
app.use(version + "/", router);

module.exports = app;
