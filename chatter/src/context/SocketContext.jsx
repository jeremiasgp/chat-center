import React, { createContext, useState, useEffect, useCallback } from 'react';
import config from '../config';
import io from 'socket.io-client';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('bot')
  const [typing, setTyping] = useState(null)
  const sendMessage = useCallback((toId, message) => {
    if (socket) {
      setMessages([...messages, { to: toId, message}])
      socket.emit(toId === 'bot' ? 'user-message' : 'chat-message', {id: toId, body: message})
      return
    }
    return
  }, [socket, messages])

  const sendTypingUser = useCallback((toId) => {
    if (socket) {
      socket.emit('user-typing', toId)
      return
    }
    return
  }, [socket])

  const stopTypingHandler = useCallback(() => { setTyping(null) }, []);
  const typingHandler = useCallback((id = null) => {
    setTyping(id || 'bot')
  }, [])

  const updateMessages = useCallback((message) => {
    setMessages([...messages, message])
    stopTypingHandler()
  }, [messages, stopTypingHandler]) 

  useEffect(() => {
    const initSocket = () => {
      const socket = io(
        config.BOT_SERVER_ENDPOINT,
        { transports: ['websocket', 'polling', 'flashsocket'] }
      );
      socket.on('user-list', (users) => {
        setUsers([...users])
      })
  
      socket.on('user-data', (userData) => {
        setUserData(userData)
      })

      setSocket(socket)
    }

    !socket && initSocket()

    socket && socket.off('user-chat-message', updateMessages)
    socket && socket.on('user-chat-message', updateMessages)

    socket && socket.off('bot-message', updateMessages)
    socket && socket.on('bot-message', updateMessages)

    socket && socket.off('bot-typing', typingHandler)
    socket && socket.on('bot-typing', typingHandler)

    socket && socket.off('stop-typing', stopTypingHandler)
    socket && socket.on('stop-typing', stopTypingHandler)

    return () => {
      socket && socket.removeAllListeners()
    }
  }, [socket, updateMessages, stopTypingHandler, typingHandler])

  

  return (
    <SocketContext.Provider value={{ users, userData, messages, sendMessage, currentUser, setCurrentUser, typing, sendTypingUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };