const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

router.get("/", async (req, res) => {
    const sql =
        "SELECT activity_records.activity_records_id, errors.error_description, activity_records.comment, users.user_id, machines.machine_id, status.status_name, status_code, activity_records.product, activity_records.created_at FROM activity_records LEFT JOIN errors ON activity_records.error_id = errors.error_id LEFT JOIN users ON  activity_records.user_id = users.user_id LEFT JOIN machines ON activity_records.machine_id = machines.machine_id LEFT JOIN status ON activity_records.status_id = status.status_id ORDER BY created_at DESC";
    await db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

router.post("/", async (req, res) => {
    const error_id = req.body.error_id;
    const status_id = req.body.status_id;
    const comment = req.body.comment;
    const user_id = req.body.user_id;
    const machine_id = req.body.machine_id;
    const product = req.body.product;

    console.log(status_id);
    const sql =
        "INSERT INTO activity_records (status_id, error_id  , comment, user_id, machine_id, product, created_at) VALUES (?,?,?,?,?,?, NOW())";
    await db.query(
        sql,
        [status_id, error_id, comment, user_id, machine_id, product],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
});
module.exports = router;
