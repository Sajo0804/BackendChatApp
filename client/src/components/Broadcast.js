import React from 'react'

const Broadcast = ({currentChat, channel}) => {
    const changeCurrentChat = (channel) => {
        currentChat(channel);
    };
  return (
    <li
    className='user-card'     
    >
    <div className="username" onClick={() => changeCurrentChat(channel)}>
      <h3>Nödmeddelanden</h3>            
    </div>
  </li>
  )
}

export default Broadcast