const dowryItem = require("../models/DowryItem");

const addItem = async(req, res) => {
    try {
        console.log("addItem started----------");
        const { title, category, quantity, price } = req.body;
        console.log("req.body", req.body)
        console.log("userId------", req.user.userId)
        if (!title || !category || !quantity || !price) {
            return res.status(400).json({ messsage: "all fields are required" })
        }
        const userId = req.user.userId;
        console.log("userId------", userId)
        const dataToUpload = new dowryItem({
            title,
            category,
            quantity,
            price,
            userId
        })
        const savedData = await dataToUpload.save(dataToUpload);
        console.log("dataToUpload", dataToUpload)
        return res.status(500).json({ message: "data saved succesfully", savedData })
    } catch (error) {
        console.log("error", error)
    }
}
const getUserItems = async(req, res) => {
    try {
        console.log("req.body", req.user.userId);
        const userId = req.user.userId;
        const items = await dowryItem.find({ userId });
        console.log("items-====-=-", items);
        return res.status(500).json({ message: "Items Found Successfully" })
    } catch (error) {
        console.log("err", error)
    }
}
const deleteItems = async(req, res) => {
    try {
        console.log("deleteItems----started", req.params.id);
        const itemId = req.params.id;
        const itemToBeDeleted = await dowryItem.findByIdAndUpdate(itemId, { isDeleted: true }, { new: true })
        console.log("itemToBeDeleted--=-===-", itemToBeDeleted);
        return res.status(500).json({ message: "Item Deleted Succesfully" });
        // const deleteData = await dowryItem.delete(itemToBeDeleted)
        // console.log("deleteData", deleteData)
    } catch (err) {
        console.log("err", err)
    }
}

module.exports = {
    addItem,
    getUserItems,
    deleteItems
}