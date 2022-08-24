const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig");

router.get("/", async (req, res) => {
    const sql =
        "SELECT * FROM machines LEFT JOIN status ON machines.status_id = status.status_id ORDER BY machine_id ASC";
    await db.query(sql, (err, result) => {
        if (err) console.log(err);

        console.log(result);
        res.send(result);
    });
});

router.get("/statusCount/pr", async (req, res) => {
    await db.query(
        "SELECT count(status_id) as pr_count FROM machines WHERE status_id = ?",
        1,
        (err, result) => {
            res.send(result[0]);
        }
    );
});

router.get("/statusCount/pr", async (req, res) => {
    await db.query(
        "SELECT count(status_id) as pr_count FROM machines WHERE status_id = ?",
        1,
        (err, result) => {
            res.send(result[0]);
        }
    );
});

router.get("/statusCount/su", async (req, res) => {
    await db.query(
        "SELECT count(status_id) as su_count FROM machines WHERE status_id = ?",
        2,
        (err, result) => {
            res.send(result[0]);
        }
    );
});

router.get("/statusCount/pd", async (req, res) => {
    await db.query(
        "SELECT count(status_id) as pd_count FROM machines WHERE status_id = ?",
        3,
        (err, result) => {
            res.send(result[0]);
        }
    );
});

router.get("/statusCount/ed", async (req, res) => {
    await db.query(
        "SELECT count(status_id) as ed_count FROM machines WHERE status_id = ?",
        4,
        (err, result) => {
            res.send(result[0]);
        }
    );
});

router.get("/statusCount/id", async (req, res) => {
    await db.query(
        "SELECT count(status_id) as id_count FROM machines WHERE status_id = ?",
        5,
        (err, result) => {
            res.send(result[0]);
        }
    );
});

router.get("/statusCount/machines_count", async (req, res) => {
    await db.query(
        "SELECT count(*) as machines_count FROM machines",
        (err, result) => {
            res.send(result[0]);
        }
    );
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
