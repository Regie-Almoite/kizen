const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

//get errors data
router.get("/", async (req, res) => {
    const sql = "SELECT * FROM errors";
    await db.query(sql, (err, result) => {
        res.send(result);
    });
});

module.exports = router;
