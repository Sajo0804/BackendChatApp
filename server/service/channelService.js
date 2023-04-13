import Channel from "../models/channelModel.js"

export async function makeChannel (createdBy, theme) {
    // Check if username already exist in database
    const themeExist = await Channel.findOne({ theme });

    if (themeExist) {
        return ({ msg: "theme already used", status: false });
    }

    // Create channel in database with req values
    const channel = await Channel.create({
        theme: theme,
        messages: [],
        createdBy: createdBy
    });

    return ({ status: true, channel });
}

export async function postMessage (id, sender, fromName, text) {
  // Check if channel exist in database
  const channel = await Channel.findOne({ _id: id });

  if (!channel) {
    return ({ msg: "Channel doesnt exist", status: false })
  }

  const newArray = [...channel.messages, {sender: sender, fromName: fromName, text: text, createdAt: Date.now()
  }];

  await Channel.updateOne({_id: id},{$set : {messages: newArray}})
  return ({ status: true, channel });
}

export async function findChannel (id) {
  // Check if username already exist in database
  const channel = await Channel.findOne({ _id: id });

  if (!channel) {
      return ({ msg: "Channel doesnt exist", status: false })
  }

  return ({ status: true, channel });
}

export async function findChannels () {
  // Check if username already exist in database
  const channels = await Channel.find({}, {})

  return ({ status: true, channels });
}

export async function removeChannel(id, createdBy) {
  const channel = await Channel.findOne({ _id: id });

  if (!channel) {
    return ({ msg: "Channel doesnt exist", status: false })
    
  }

  if (channel.createdBy != createdBy) {
    return ({ msg: `You didnt create this channel: ${channel.theme}`, status: false })
  }

  await Channel.findOneAndRemove({ _id: id });
  return ({ status: true });
}

export default { makeChannel, removeChannel, postMessage }