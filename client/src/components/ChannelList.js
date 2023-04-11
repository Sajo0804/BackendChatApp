import React from 'react'
import Contact from './Channel'
import Broadcast from './Broadcast';

const ContactList = ({channels, currentChat, currentUser}) => {
  return (
    <ul>
      <Broadcast currentChat={currentChat} />
      {channels.map((channel, index) => {
        return (
          <Contact
            key={channel._id} 
            channel={channel}
            currentChat={currentChat}
            currentUser={currentUser}
          />
        );
      })}
    </ul>
  )
}

export default ContactList
