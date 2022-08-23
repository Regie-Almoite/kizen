const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

//get status data
router.get("/", async (req, res) => {
    const sql = "SELECT * FROM status";
    await db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

module.exports = router;
