import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import useSound from 'use-sound';
import config from '../../../config';
import Header from './Header';
import Footer from './Footer';
import '../styles/_messages.scss';
import { SocketContext } from '../../../context/SocketContext'

function Messages() {
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { currentUser, sendMessage, messages, typing, sendTypingUser } = useContext(SocketContext);
  const messagesScrollRef = useRef(null)

  const [message, setMessage] = useState('')
  const currentUserMessages = messages.filter(({from, to}) => [from, to].includes(currentUser))
  const receivedMessages = currentUserMessages.filter(({from}) => !!from).length

  useEffect(() => {
    messagesScrollRef.current.scrollIntoView()
  }, [currentUserMessages])

  useEffect(() => {
    receivedMessages && playReceive()
  }, [receivedMessages, playReceive])

  const sendMessageHandler = (currentUser, message) => {
    sendMessage(currentUser, message)
    playSend()
    setMessage('')
  }

  return (
    <div className="messages">
      <Header />
      <div className="messages__list--wrapper" >
      <div className="messages__list" id="message-list">
        {currentUserMessages.map((msj, index) => (<p key={msj.message.split(' ').concat(index).join('-')} className={!!msj.to ? 'messages__message--right' : ''}>{msj.message}</p>))}
        {typing && typing === currentUser && (<small>Writting ...</small>)}
        <div className='messages__last' ref={messagesScrollRef}></div>
      </div>
      </div>
      <Footer
        message={message}
        sendMessage={sendMessageHandler.bind(null, currentUser, message)}
        sendWrittingMessage={() => { sendTypingUser(currentUser) }}
        onChangeMessage={(v) => setMessage(v.target.value)} />
    </div>
  );
}

export default Messages;
