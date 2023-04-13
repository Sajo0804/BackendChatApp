import React, {useState} from 'react'
import { deleteChannelRoute } from '../utils/Routes';
import axios from 'axios';
import {BsTrashFill} from "react-icons/bs"

const Contact = ({channel, currentChat, currentUser}) => {

  const changeCurrentChat = (channel) => {
    currentChat(channel);
  };



  const deleteChannel = async () => {
    // const config = {
    //   headers:{
    //     // authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
    //   }
    // };

    console.log("user id: ", currentUser._id)
    console.log("channel id: ", channel._id)
    if (currentUser) {
      await axios.delete(`${deleteChannelRoute}/id=${channel._id}&createdBy=${currentUser._id}`);
    }    
  }


  return (
        <li
          className={ channel.theme === "Nödmeddelande" ? "user-card alert" : "user-card"}
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