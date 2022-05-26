const User = require('../model/userschema');
const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const Messages = require('../model/messageschema');

//Create Messages Api
router.post('/message', verifyToken, async(req, res) => {
    console.log("=>>", req.headers.user);
    const { user: { user_id } } = req.headers;
    const { receiver_id, text, reply_id } = req.body;
    const newchat = new Messages({ sender_id: user_id, receiver_id, text, reply_id });
    const savechat = await newchat.save();
    res.status(200).json(savechat);
});

//Read Messages Api
router.get('/GetMsg', verifyToken, async(req, res) => {
    const { user: { user_id } } = req.headers;
    const { receiver_id } = req.body;
    const getMessages = await Messages.find({
        $or: [{ $and: [{ sender_id: user_id }, { receiver_id: receiver_id }] },
            { $and: [{ sender_id: receiver_id }, { receiver_id: user_id }] },
            { $and: [{ reply_id: req.query.reply_id }] }
        ]
    }).populate('users');
    res.send(getMessages);
});


//Update Message Api
router.patch('/messageUpdate', async(req, res, next) => {
    try {
        const { id, Text } = req.body;
        const result = await Messages.updateOne({ id }, {
            $set: {
                Text: Text
            }
        });
        res.send(result);
    } catch (ex) {
        next(ex);
    }
});


//Delete Message Api
router.delete("/deletemsg/:id", async(req, res) => {
    const id = req.params.id
    const result = await Messages.deleteOne({ _id: id });
    res.send(result);
});


//search api
router.get("/search/:username", function(req, res) {
    const regex = new RegExp(req.params.username, 'i');
    User.find({ username: regex }).then((username) => {
        res.status(200).json(username)
    })
});


//Get login user contact list
router.get('/Getcontact', verifyToken, async(req, res) => {
    {
        const { user: { user_id } } = req.headers;
        const getuser = await Messages.find({ $or: [{ senderid: user_id }, { receiverid: user_id }] }).populate('messages').distinct('receiverid');
        const users = await User.find({ '_id': { $in: getuser } }).populate('users').select('username');
        res.send(users);
    }
});



module.exports = router;