const express = require("express");
const router = express.Router();

const routerBase = require("../api/base");

router.use("/", routerBase);

module.exports = router;
