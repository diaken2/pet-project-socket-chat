import Box from "@mui/material/Box";
import {getMessageStyle,getNickStyle, getMessageBoxStyle } from './MessagesStyles'

const Messages = ({messages,nick}) => {
    console.log(messages)
  return (
    <Box>
    {messages.map((user) => (
      <Box sx={getMessageStyle(user.nick,nick)}>
        <Box sx={getNickStyle}>{user.nick}</Box>
        <Box sx={getMessageBoxStyle(user.nick,nick)}>{user.message}</Box>
      </Box>
    ))}
  </Box>
  )
};

export default Messages;
