export const getMessageStyle = (userNick,nick) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems:userNick === nick ? "flex-end":'flex-start',
    marginBottom: '15px',
  });
  
  export const getNickStyle = {
    marginBottom: '5px',
    fontWeight:'bold'
  };

  export const getMessageBoxStyle = (userNick,nick) => ({
    display: 'inline-block',
    backgroundColor: userNick === nick ? 'green' : '#EFF6FF',
    borderRadius: '15px',
    padding: '10px',
    maxWidth:"400px",
    wordWrap:"break-word",
    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)'
  });