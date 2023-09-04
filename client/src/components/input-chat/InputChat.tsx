import { Box, IconButton, TextField } from "@mui/material";
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const InputChat = ({sendMessage, setMessage}) => {
  return (
    <Box display="flex" gap="10px" width="100%">
    <TextField
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Напишите сообщение"
        fullWidth
        sx={{paddingLeft:'10px'}}
        margin="normal"
        variant="outlined"
        inputProps={{ style: { padding: '10px' } }}
      />
      <IconButton onClick={sendMessage} color="primary" aria-label="add an alarm">
  <SendIcon />
</IconButton>
     </Box>
  )
};

export default InputChat;
