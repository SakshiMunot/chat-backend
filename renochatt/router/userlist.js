// Deepmita Ray
// work - userlist
// work start - 05-05-20222
// work done- 05-05-2022

var router = require('express').Router();
var express = require('express');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const User = require('../model/userschema');
router.get('/getAllUsers', async(req, res) => {
    const Data = await User.find({ _id: { $ne: req.params._id } }).populate('username').select('username');
    res.json(Data)
});


module.exports = router