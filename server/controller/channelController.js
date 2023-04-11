import { makeChannel, findChannel, findChannels, removeChannel, postMessage } from '../service/channelService.js';

function getChannels(req, res) {
    findChannels().then(data => {
        res.json(data)
    })
}

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

function deleteChannel(req, res) {
    const id = req.params.id;
    const createdBy = req.body.createdBy;
    console.log(id)
    
    removeChannel(id, createdBy).then(data => {
        res.json(data)
    })
}

function createChannel(req, res) {
    const { createdBy, theme } = req.body;
    makeChannel(createdBy, theme).then(data => res.json(data))
}

export default { getChannels, getChannel, deleteChannel, createChannel, postChannel}
