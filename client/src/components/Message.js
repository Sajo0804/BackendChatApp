import React, {useState, useRef} from 'react'
import format from 'date-fns/format'


const Message = ({message, currentUser}) => {
  const [viewTime, setViewTime] = useState(false);

  
  return (
    <div className="message" onClick={() => setViewTime(!viewTime)}>
      <p className="small-text">
        <span className='from-name'>{message?.fromName}</span>
        {
          message?.createdAt &&
          format(new Date(message.createdAt), 'dd MMMM yyyy hh:mm')
        }
      </p>

      <div>
        <div>
          <p>{message?.text}</p>
        </div> 
      </div>
    </div>
  )
}

export default Message