import { fetchMessages, makeChannel, findChannel, findChannels, removeChannel, postMessage } from '../service/channelService.js';

// klar
function getChannels(req, res) {
    findChannels().then(data => {
        res.json(data)
    })
}

// klar
function getChannel(req, res) {
    const id = req.params.id;
    findChannel(id).then(data => {
        res.json(data)
    })
}

function postChannel(req, res) {
    const id = req.params.id;

    const { sender, fromName, text } = req.body;
    console.log(text)
    postMessage(id, sender, fromName, text).then(data => {
        res.json(data)
    })
}

// klar
function deleteChannel(req, res) {
    const id = req.params.id;
    console.log(id)
    
    removeChannel(id).then(data => {
        res.json(data)
    })
    
}

// klar
function createChannel(req, res) {
    const { createdBy, theme } = req.body;
    makeChannel(createdBy, theme).then(data => res.json(data))
}

function getMessages(req, res) {
//     const { from, to } = req.body;
//     console.log( from, to)

//     fetchMessages(from, to).then(data => res.json(data));
}

export default { getChannels, getChannel, deleteChannel, createChannel, getMessages, postChannel}
