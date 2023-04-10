import React, { useState, useEffect } from 'react'
import axios from "axios"
import { sendMessageRoute } from "../utils/Routes";


const MessageForm = ({selectedChat, currentUser}) => {
    const [messageInput, setMessageInput] = useState("");
    
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const config = {
      headers:{
        authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
      }
    };

    await axios.post(`${sendMessageRoute}/${selectedChat._id}`, {
      sender: currentUser._id,
      fromName: currentUser.username,
      text: messageInput,
    }, config);
    setMessageInput("")
  }



  return (
    <div className='message-container'>
      <form className='message-form' onSubmit={handleSendMessage}>
          <input
          type="text"
          placeholder='Skriv ett meddelande...'
          onChange={(e) => setMessageInput(e.target.value)}
          value={messageInput}
          />
      </form>
    </div>
  )
}

export default MessageForm