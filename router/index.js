const express = require("express");
const router = express.Router();

const routerUsers = require("../api/users");

router.use("/", routerUsers);

module.exports = router;
