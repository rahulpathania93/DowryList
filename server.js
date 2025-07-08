console.log("hello")
    // const env = require("dotenv").config();
const express = require("express");
const { connectToMongodb } = require('./config/db')
require("dotenv").config();
// dotenv.config();
const app = express()
app.use(express.json());
const authRoutes = require("./routes/auth")
const dowryItemRoutes = require("./routes/dowry")
console.log("hell2o")
app.use("/api", authRoutes);
app.use("/api", dowryItemRoutes);
app.use(express.static("public"));
const path = require("path");

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

connectToMongodb().then(() => {
    console.log("here in s")
    app.get("/", (req, res) => {
        console.log("hello3")
        res.send("App Running 🚀");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log("App is Running on PORT:", PORT)
    })
}).catch((err) => {
    console.log("err", err)
})