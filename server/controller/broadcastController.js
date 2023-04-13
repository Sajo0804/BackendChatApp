import { findBroadcast, postBroadcastMessage} from "../service/broadcastService.js"

function getBroadcast(req, res) {
    findBroadcast().then(data => res.json(data))
}

function postBroadcast(req, res) {
    const { sender, fromName, text } = req.body;
    postBroadcastMessage(sender, fromName, text).then(data => res.json(data))
}

export default {getBroadcast, postBroadcast}