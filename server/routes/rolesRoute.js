const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

router.get("/", (req, res) => {
    const sql = "SELECT * FROM roles";
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
