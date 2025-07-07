const mongoose = require("mongoose");
const DowryitemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Electronics", "cash", "Jewelry", "vehicle", "Furniture",
            "Real Estate",
            "Clothing",
            "Household Items",
            "Home Appliances",
            "Gifts & Miscellaneous"
        ],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });
module.exports = mongoose.model(
    'DowryItem',
    DowryitemSchema

)