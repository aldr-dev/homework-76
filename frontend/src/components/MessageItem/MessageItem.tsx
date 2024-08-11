import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {MessageData} from '../../types';
import dayjs from 'dayjs';

interface Props {
  data: MessageData;
}

const MessageItem: React.FC<Props> = ({data}) => {
  return (
    <Grid container direction="column" sx={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', mb: 1}}>
      <Typography variant="body1">
        <b>Автор:</b> {data.author}
      </Typography>
      <Grid container justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1">
            <b>Сообщение:</b> {data.message}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{textAlign: 'right'}}>
          {dayjs(data.datetime).format('DD.MM.YYYY HH:mm')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MessageItem;