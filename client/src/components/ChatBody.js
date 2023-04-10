import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import { getMessageRoute } from "../utils/Routes";
import MessageForm from './MessageForm';
import Message from './Message';
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ChatBody = ({selectedChat, currentUser, closeChat}) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null)
  const [recivedMessage, setRecivedMessage] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await JSON.parse(
        localStorage.getItem("current user")
      );
    }
    getCurrentUser()
  }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      const config = {
        headers:{
          authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
        }
      };
      
      const getMessages = async () => {
        const user = await JSON.parse(
          localStorage.getItem("current user")
        );
        const response = await axios.get(`${getMessageRoute}/${selectedChat._id}`, config);

        setMessages(response.data.channel.messages);
        console.log(response.data.channel.messages)
      }
      getMessages()
    }, []);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages]);

    useEffect(() => {
      setMessages((prev) => [...prev, recivedMessage]);
      // alert(recivedMessage.message.text)
    }, [recivedMessage])

  return (
    <div className='chat-body'>
      <header className='chat-header'>
        {selectedChat && 
          <AiOutlineArrowLeft className='icon' onClick={closeChat}/>}
        <h3>{selectedChat?.theme}</h3>
      </header>
        <div className='messages-body'> 
          {messages?.map((message) => {
            return (
              <Message currentUser={currentUser}  message={message}/>
            );
          })}
        </div>
        
        <MessageForm currentUser={currentUser} selectedChat={selectedChat}/>
        <div className='scroll-to-bottom' ref={messagesEndRef}/>
    </div>
  )
}

export default ChatBody
