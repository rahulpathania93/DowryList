const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// const mongoose = require("mongoose");
const registerUser = async(req, res) => {
    try {
        console.log("controller started-=-===")
        const { name, email, password } = req.body
        console.log("name", name);
        if (!name && !email && !password) {
            console.log("all fields are cumpolsary")
        }
        console.log("if------332-----")

        // let existingUser
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log("if---------22--")
            return res.status(200).json({ message: "email already exists" })
        }
        //  else {
        console.log("else=-=-=-=-=-=-=-")
        const saltRounds = 10;
        // const plainPassword = password
        // console.log("plainPassword", plainPassword)
        // const hashPassword = bcrypt.genSalt(saltRounds, async function(err, hashPassword) {
        const hashPassword = await bcrypt.hash(password, saltRounds); // ✅ add await


        // if (err) {
        //     throw err
        // } else {
        //     console.log("hashPassword", hashPassword)
        //         // const hashPassword = salt
        // return hashPassword
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        console.log("newUser", newUser)
        const savedUser = await newUser.save()
        console.log("savedUser", savedUser)
            // return res.status(201).json({ message: "user Register successfully" })
            // const secret = "my-secret-key"
            // const token = jwt.sign({ userId: savedUser._id, email: savedUser.email }, secret, { algorithm: 'HS256', expiresIn: '1h' })
            // console.log("token", token)
            // }
            // })
            // console.log("salt-----", salt)
            // }

        // }
        return res.status(201).json({ message: "user created successfully", savedUser })


    } catch (error) {
        console.log("error", error)
        return res.status(500).json({ message: "Server error", error: error.message });

    }

}
const login = async(req, res) => {
    try {
        console.log("login------")
        const { email, password } = req.body;
        console.log("email", email);
        if (!email || !password) {
            return res.status(500).json({ message: "all fields are required" })
        }
        const user = await User.findOne({ email })
        console.log("user", user)
        const Npassword = user.password
        if (!user) {
            return res.status(500).json({ message: "User not found" })
        }
        const hashPassword = bcrypt.compare(password, Npassword, (err, data) => {
            if (err) {
                throw err
            }
            console.log("data", data)
            const token = jwt.sign({ userId: user._id, email: email }, process.env.secret, { expiresIn: "1h" })
            console.log("token", token)
            return res.status(201).json({ message: "successfully login", token, user })
        })
        console.log("hashPassword", hashPassword)
    } catch (err) {
        console.log("err=-=-=-=-=-=", err)
    }

}

module.exports = {
    registerUser,
    login
}