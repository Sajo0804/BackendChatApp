import React, {useState} from 'react'
import { deleteChannelRoute } from '../utils/Routes';
import axios from 'axios';
import {BsTrashFill} from "react-icons/bs"

const Contact = ({channel, currentChat, currentUser}) => {

  const changeCurrentChat = (channel) => {
    currentChat(channel);
  };

  const deleteChannel = () => {
    const config = {
      headers:{
        authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
      }
    };

    console.log(channel._id)
    if (currentUser) {
      axios.delete(`${deleteChannelRoute}/${channel._id}`, config);
    }
  }

  return (
        <li
          className='user-card'
          key={channel._id}          
        >
          <div className="username" onClick={() => changeCurrentChat(channel)}>
            <h3>{channel.theme}</h3>            
          </div>
          {
            channel.createdBy === currentUser._id && <BsTrashFill onClick={deleteChannel}/>
          }
        </li>
  )
}

export default Contact