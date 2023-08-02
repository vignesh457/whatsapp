import React from 'react'
import "../Message/Message.css"

function Message(props) {
  return (
    <div className='message-ctn'>
        {(props.currUser===props.username) && <p className='message me'>
          <h6 className='message-header mh'>me</h6>
          {props.text}
        </p>}
        {(props.currUser!==props.username) && <p className='message'>
          <h6 className='message-header'>{props.username}</h6>
          {props.text}
        </p>}
    </div>
  )
}

export default Message