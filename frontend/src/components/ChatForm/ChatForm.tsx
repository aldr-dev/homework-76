import {Box, Grid, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import React, {useState} from 'react';
import {MessageForm} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {postMessageData} from '../../store/chatThunks';
import {toast} from 'react-toastify';
import {selectPostIsLoading} from '../../store/chatSlice';

const ChatForm = () => {
  const [chatData, setChatData] = useState<MessageForm>({
    author: '',
    message: '',
  });
  const dispatch = useAppDispatch();
  const postIsLoading = useAppSelector(selectPostIsLoading);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setChatData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (chatData.author.trim().length !== 0 && chatData.message.trim().length !== 0) {
        await dispatch(postMessageData(chatData)).unwrap();

        setChatData({
          author: '',
          message: '',
        });

        toast.success('Сообщение было успешно отправлено.');
      }
    } catch (error) {
      console.error(error + 'Произошла ошибка при отправке запроса, попробуйте позже.');
      toast.error('Произошла ошибка при отправке запроса, попробуйте позже.');
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
            loading={postIsLoading}
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