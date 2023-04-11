// Nödkanal syftar på en unik (endast en) kanal som skapas vid uppstart och håller i alla nödmeddelanden som skickas.

import { findBroadcast, postBroadcastMessage} from "../service/broadcastService.js"

// [GET] - http://adress:port/ducks/api/broadcast/ 
// hämtar en lista över alla händelser som har skickats ut, ex. älgvandring, traffikolycker m.m. 

function getBroadcast(req, res) {
    findBroadcast().then(data => res.json(data))
}

// [POST] - http://adress:port/ducks/api/broadcast/ 
// skapar en ny nödhändelse. Detta anrop ska kräva ett giltigt JWT token.
function postBroadcast(req, res) {
    const { sender, fromName, text } = req.body;
    postBroadcastMessage(sender, fromName, text).then(data => res.json(data))
}

export default {getBroadcast, postBroadcast}