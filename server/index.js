const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kizendb",
});

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"], //array of the url of our frontend
        methods: ["GET", "POST", "PUT"], //methods used
        credentials: true, //cookie
    })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "kodegokizensecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.get("/", (req, res) => {
    res.send("Server Connection Successful");
});

//get request for store user session
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", async (req, res) => {
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

app.post("/logout", (req, res) => {
    console.log("Here");
    req.session.destroy();
    res.send({ loggedIn: false });
});

app.post("/register", (req, res) => {
    const first_name = "Marco";
    const last_name = "Lazaro";
    const email = "prodsup@example.com";
    const password = "prodsup123";
    const role_id = 2;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        const sql =
            "INSERT INTO users (first_name, last_name, email, password, role_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";

        db.query(
            sql,
            [first_name, last_name, email, hash, role_id],
            (err, result) => {
                if (err) console.log(err);
                console.log(result);
            }
        );
    });
});

app.get("/getRoles", (req, res) => {
    const sql = "SELECT * FROM roles";
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

app.get("/machines", (req, res) => {
    const sql =
        "SELECT * FROM machines RIGHT JOIN status ON machines.status_id = status.status_id";
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`connecting to port ${port}`);
});
