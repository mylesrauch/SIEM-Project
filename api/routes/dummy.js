const express = require("express");
const router = express.Router();
const log = require("../models/logSchema")

router.get('/', async(req, res) => {

    res.status(200)
})

module.exports = router;