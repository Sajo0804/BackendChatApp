import React, {useState, useEffect} from 'react'
import ChannelList from '../components/ChannelList'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import { allChannelsRoute, logoutRoute, host, deleteRoute, broadcastRoute } from '../utils/Routes';
import ChatBody from '../components/ChatBody'
import CreateChannel from '../components/CreateChannel';
import {GrMenu} from 'react-icons/gr'

const Chat = () => {
  const navigate = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const [currentUser, setCurrentUser] = useState("");
  const [channels, setChannels] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getCurrentUser = async () => {
      // If user is not saved in localstorage navigate back to login
      if (!localStorage.getItem("current user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem("current user")
          )
        );
      }
    }
    getCurrentUser()
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Send get request to server to fetch all contacts
    const config = {
      headers:{
        authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
      }
    };

    const getAllChannels = async () => {
      if (currentUser) {
        const data = await axios.get(`${allChannelsRoute}`);
        const broadcastData = await axios.get(`${broadcastRoute}`);
        
        let channelsList = data.data.channels;
        channelsList.push(broadcastData.data.channel)
        channelsList.reverse()
        await setChannels(data.data.channels);
      }
    }
    getAllChannels()
  }, [currentUser]);


  const handleChangeSelectedChat = (chat) => {
    setSelectedChat(chat)
    console.log(chat)
  }

  const closeChat = () => {
    setSelectedChat("")
  }

  const logOutUser = async () => {
    const id = await JSON.parse(
      localStorage.getItem("current user")
    )._id;

    const data = await axios.get(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      setCurrentUser("")
      navigate("/login");
    }
  }

  const deleteUser = async () => {
    const id = await JSON.parse(
      localStorage.getItem("current user")
    )._id;

    const data = await axios.get(`${deleteRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      setCurrentUser("")
      navigate("/login");
    }

  }

  return (
    <div className='chat-page'>
      <nav className="navigation">
        <GrMenu
        className='hamburger'
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
          />
        <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
          <ul>
            <li>
              <button onClick={logOutUser}>Logga ut</button>
            </li>
            <li>
              <button onClick={deleteUser}>Radera konto</button>
            </li>
          </ul>
        </div>
      </nav>
      
      <CreateChannel currentUser={currentUser}/>
      {selectedChat ?
      <>
        <ChatBody currentUser={currentUser} selectedChat={selectedChat} closeChat={closeChat}/>
      </>
      :
      <>
        <h2>Välkommen, {currentUser["username"]}</h2>
        <ChannelList currentUser={currentUser} channels={channels} currentChat={handleChangeSelectedChat}/>
      </>
      }
    </div>
  )
}

export default Chat