const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//routes
const userRoute = require("./routes/userRoute");
const rolesRoute = require("./routes/rolesRoute");
const machineRoute = require("./routes/machineRoute");
const statusRoute = require("./routes/statusRoute");
const errorsRoute = require("./routes/errorsRoute");
const recordsRoute = require("./routes/recordsRoute");

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"], //array of the url of our frontend
        methods: ["GET", "POST", "PUT", "DELETE"], //methods used
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
app.use("/users", userRoute);
app.use("/roles", rolesRoute);
app.use("/machines", machineRoute);
app.use("/status", statusRoute);
app.use("/errors", errorsRoute);
app.use("/records", recordsRoute);

app.listen(process.env.PORT || PORT, () => {
    console.log(`connecting to port ${PORT}`);
});
