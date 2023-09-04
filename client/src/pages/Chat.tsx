import React,{FC, useState, useEffect, useRef } from "react"
import InputChat from "../components/input-chat/InputChat";
import Messages from "../components/messages/Messages";
import io from 'socket.io-client';
import Box from "@mui/material/Box";

let socket=null
const nick=prompt('Введи ник: ')
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectedUser,setConnectedUser]=useState('')
  const [disconnectedUser,setDisConnectedUser]=useState('')
  const [allConnectedUsers,setAllConnectedUsers]=useState([])
  const disconnectMsgTimeout = useRef(null);
  useEffect(() => {
    socket = io("http://192.168.1.94:8888");
    socket.on("userName", (user) => {
        // Функциональное обновление значений
        setConnectedUser(user)
        setAllConnectedUsers(prev=>[...prev, user])
         // Clear any previous disconnect message timeout
      clearTimeout(disconnectMsgTimeout.current);

      disconnectMsgTimeout.current = setTimeout(() => {
        setConnectedUser("");
      }, 3000);
      });
    socket.on("message", (message) => {
      // Функциональное обновление значений
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("disconnectedUser", (disUser) => {
        // Функциональное обновление значений
        setDisConnectedUser(disUser);
        const newConnectedUserList=allConnectedUsers.filter((user)=>{
          return user!=disUser
    })
        setAllConnectedUsers(newConnectedUserList)
        disconnectMsgTimeout.current = setTimeout(() => {
          setDisConnectedUser("");
        }, 3000);
      });
    socket.emit('connectedUser', nick);
    
    window.addEventListener('beforeunload', (event) => {
        setConnectedUser('')
        event.preventDefault();
        socket.emit('discon',nick)
        
      });
    // Очистить событие при размонтировании компонента
    return () => {
        
        socket.disconnect()
    };
  }, []);

  const sendMessage = e => {
      console.log('Функция')
    socket.emit('sendMessage', {message,nick});
    setMessage('');
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" height="100%">
  <Box >
    <div style={{ color: 'red' }}>
      Подключенные пользователи
      <ul>
        {allConnectedUsers.map((user) => {
          return <li>{user}</li>;
        })}
      </ul>
    </div>
    {disconnectedUser && `Пользователь под ником ${disconnectedUser} отключился`}
    {connectedUser && `Подключился пользователь под ником ${connectedUser}`}
  </Box>
  <Box sx={{
    maxHeight:"500px", overflowY:'scroll', width:'100%'
  }}>
    <Messages nick={nick} messages={messages} />
  </Box>
  <Box  alignSelf="center" width="100%" flex="0 1 auto">
    <InputChat setMessage={setMessage} sendMessage={sendMessage} />
  </Box>
</Box>
  )
};

export default Chat;
