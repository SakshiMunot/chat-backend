require("dotenv").config();
var router = require('express').Router();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/userschema");
consrouter = express();
router.use(express.json({ limit: "50mb" }));

router.post("/register", async(req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async(req, res) => {
    try {

        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email },
                process.env.JWT_KEY, {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        }
        // res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});


// forgot password
router.patch('/forgot_password', async(req, res, next) => {
    try {
        const { email, new_password } = req.body;
        const emailCheck = await User.findOne({ email });
        console.log(emailCheck);
        const result = await User.updateOne({ email }, {
            $set: {
                password: new_password
            }
        });
        console.log("password changed")
        res.send(result);
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;