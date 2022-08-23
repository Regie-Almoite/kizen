const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

router.get("/", (req, res) => {
    const sql =
        "SELECT * FROM machines RIGHT JOIN status ON machines.status_id = status.status_id ORDER BY machine_id ASC";
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.get("/:id", async (req, res) => {
    const machine_id = req.params.id;
    const sql =
        "SELECT * FROM machines RIGHT JOIN status ON machines.status_id = status.status_id WHERE machine_id = ?";

    await db.query(sql, machine_id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.put("/:id", async (req, res) => {
    const machine_id = req.params.id;
    const status_id = req.body.newStatus;
    const sql = "UPDATE machines SET status_id = ? WHERE machine_id = ?";

    await db.query(sql, [status_id, machine_id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
