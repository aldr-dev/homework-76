import {Box} from '@mui/material';

const ChatMessageBox = () => {
  return (
    <Box
      sx={{
        maxHeight: '300px',
        overflowX: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        mb: 2,
      }}>
    </Box>
  );
};

export default ChatMessageBox;