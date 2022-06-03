const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require("fs");
let messageFilePath = path.join(__dirname, '../message.json');

const message = JSON.parse(fs.readFileSync(messageFilePath, 'utf-8'));


router.post('/create', (req, res) => {
    var io=req.app.get('socketio')
    let newMessage = {
        id: message.length + 1,
        ...req.body,
    };
    message.push(newMessage);
    fs.writeFileSync(messageFilePath, JSON.stringify(message, null , ' '));
    io.emit('newMessage', newMessage)
    return res.json(newMessage)
})



module.exports = router;