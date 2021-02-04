const express = require("express");
const routerBase = express.Router();
const usersData = require("../data.json");

routerBase.get("/", (req, res) => {
  res.send("request get received on /base/ " + usersData);
});

routerBase.post("/", (req, res) => {
  res.send("request post received on /base/");
});

routerBase.put("/", (req, res) => {
  res.send("request put received on /base/");
});

routerBase.delete("/", (req, res) => {
  res.send("request delete received on /base/");
});

module.exports = routerBase;
