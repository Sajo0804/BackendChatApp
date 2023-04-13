import React from 'react'
import Contact from './Channel'

const ContactList = ({channels, currentChat, currentUser}) => {
  return (
    <ul>
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
