import Broadcast from "../models/broadcastModel.js"

export async function findBroadcast() {
    const channel = await Broadcast.findOne({ theme: "Nödmeddelande"})

    // Om nödkanalen inte existerar skapas den upp i databasen
    if(!channel) {
        const channel = await Broadcast.create({
            theme: "Nödmeddelande",
            messages: [],
            createdBy: "640ae44f67699fa3555674cf"
        });
        return ({ status: true, channel}) 
    }

    return ({ status: true, channel})
}

export async function postBroadcastMessage(sender, fromName, text) {
    const channel = await Broadcast.findOne({ theme: "Nödmeddelande" });

    if (!channel) {
        return ({ msg: "Channel doesnt exist", status: false })
    }

    const newArray = [...channel.messages, {sender: sender, fromName: fromName, text: text, createdAt: Date.now()}];

    await Broadcast.updateOne({theme: "Nödmeddelande"},{$set : {messages: newArray}})
    return ({ status: true, channel });
}

