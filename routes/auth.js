const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/authController");


router.post("/register", async(req, res) => {
    try {
        console.log("route started============")
        const { name, email, password } = req.body;
        await registerUser(req, res);
        // res.status(201).json({ message: "User Registerd successfully" })

    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
})
router.post("/login", async(req, res) => {
    try {
        console.log("route started============")
        const { email, password } = req.body;
        await login(req, res);
        // res.status(201).json({ message: "User Registerd successfully" })

    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
})

module.exports = router;