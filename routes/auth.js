const express = require("express");
const router = express.Router();
const { registerUser, login, getProfile } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware")

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
router.get("/profile", verifyToken, async(req, res) => {
        console.log("route started");
        // await verifyToken(req, res, next);
        await getProfile(req, res);
    })
    // router.get("/profile", verifyToken, getProfile);


module.exports = router;