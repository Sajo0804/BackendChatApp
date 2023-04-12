import { makeChannel, findChannel, findChannels, removeChannel, postMessage } from '../service/channelService.js';

function getChannels(req, res) {
    findChannels().then(data => res.json(data))
}

function getChannel(req, res) {

    const id = req.params.id;
    findChannel(id).then(data => {
        if (!data.status) {
            res.status(400).send(data.msg)
        } else {
            res.json(data)
        }
    })
}

function postChannel(req, res) {
    const id = req.params.id;

    const { sender, fromName, text } = req.body;
    console.log(text)
    postMessage(id, sender, fromName, text).then(data => {
        if (!data.status) {
            res.status(400).send(data.msg)
        } else {
            res.json(data)
        }
    })

}

function deleteChannel(req, res) {

    removeChannel(req.params.id.split("=")[1], req.params.createdby.split("=")[1]).then(data => {
        if (!data.status) {
            res.status(400).send(data.msg)
        } else {
            res.json(data)
        }
    })
}

function createChannel(req, res) {
    const { createdBy, theme } = req.body;
    makeChannel(createdBy, theme).then(data => {
        if (!data.status) {
            res.status(400).send(data.msg)
        } else {
            res.json(data)
        }
    })
}

export default { getChannels, getChannel, deleteChannel, createChannel, postChannel}
