const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
const saltRounds = 10;

router.get("/login", (req, res) => {
    console.log(req.session.user);
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? ";
    // let resultPassword = "";

    await setTimeout(() => {
        db.query(sql, email, (err, result) => {
            if (err) console.log(err);

            if (result.length > 0) {
                bcrypt.compare(
                    password,
                    result[0].password,
                    (err, response) => {
                        if (response) {
                            req.session.user = result; //create user session after successful login
                            console.log(req.session.user);
                            res.send(result);
                        } else {
                            res.send({
                                message: "Wrong email/password combination",
                            });
                        }
                        console.log(response);
                    }
                );
            } else {
                res.send({ message: "User doesn't exist." });
            }
        });
    }, 4000);
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.send({ loggedIn: false });
});

router.get("/", async (req, res) => {
    const sql = "SELECT user_id, first_name, last_name, email FROM users";
    await db.query(sql, (err, result) => {
        if (err) console.log(err);

        res.send(result);
    });
});

router.post("/add", async (req, res) => {
    const { first_name, last_name, email, password, role_id } = req.body;
    console.log(email);

    await db.query(
        "SELECT * FROM users WHERE email = ?",
        email,
        async (err, result) => {
            console.log(result);
            if (result.length > 0) {
                console.log("err");
                res.send({ error: "Your email input is already exist" });
            } else {
                await bcrypt.hash(password, saltRounds, async (err, hash) => {
                    const sql =
                        "INSERT INTO users (first_name, last_name, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
                    await db.query(
                        sql,
                        [first_name, last_name, email, hash, role_id],
                        async (err, result) => {
                            if (err) console.log(err);
                            const sql2 =
                                "SELECT user_id, first_name, last_name, email FROM users";
                            await db.query(sql2, (err, result) => {
                                res.send(result);
                            });
                        }
                    );
                });
            }
        }
    );
});

router.delete("/delete/:id", async (req, res) => {
    const user_id = req.params.id;
    const sql = "DELETE FROM users WHERE user_id = ?";
    await db.query(sql, user_id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.put("/updateName/:id", async (req, res) => {
    const id = req.params.id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const sql =
        "UPDATE users SET first_name = ?, last_name = ?, updated_at = now() WHERE user_id = ?";
    await db.query(sql, [first_name, last_name, id], (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });

    await db.query(
        "SELECT user_id, first_name, last_name, role_id FROM users WHERE user_id = ?",
        [id],
        (err, result) => {
            req.session.user = result;
            res.send(result);
        }
    );
});

router.put("/updatePassword/:id", (req, res) => {
    const password = req.body.password;
    const id = req.params.id;
    const sql = "UPDATE users SET password = ? WHERE user_id = ?";
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(sql, [hash, id], (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        });
    });
});

module.exports = router;
