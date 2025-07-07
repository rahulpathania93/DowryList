const express = require("express");
const router = express.Router();
const { addItem, getUserItems, deleteItems } = require("../controllers/dowryController");
const verifyToken = require("../middleware/authMiddleware")

// router.post("/addItem", verifyToken, addItem);
router.post("/addItem", verifyToken, async(req, res) => {
    try {
        console.log("route started============")
            // const { name, email, password } = req.body;
        await addItem(req, res);
        // res.status(201).json({ message: "User Registerd successfully" })

    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
})
router.get("/getUserItems", verifyToken, getUserItems);
router.delete("/:id", verifyToken, deleteItems);
module.exports = router;