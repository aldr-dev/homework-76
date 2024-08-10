import {Box, Grid, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import React, {useState} from 'react';
import {ChatFormField} from '../../types';

const ChatForm = () => {
  const [chatData, setChatData] = useState<ChatFormField>({
    author: '',
    message: '',
  });

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setChatData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (chatData.author.trim().length !== 0 && chatData.message.trim().length !== 0) {

    }
  };


  return (
    <Box component="form" onSubmit={onSubmitForm}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={onFieldChange}
            type="text"
            label="Автор"
            id="author"
            required
            name="author"
            value={chatData.author}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={onFieldChange}
            label="Сообщение"
            id="message"
            type="text"
            multiline
            rows={6}
            required
            name="message"
            value={chatData.message}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            sx={{height: '43px'}}
            type="submit"
            color="primary"
            loadingPosition="start"
            variant="contained"
            startIcon={<SendIcon/>}>
            <span>Отправить</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatForm;