import ChatForm from '../../components/ChatForm/ChatForm';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchLastMessageData, fetchMessageData} from '../../store/chatThunks';
import {toast} from 'react-toastify';
import {selectGetIsLoading, selectLastDate, selectMessageData} from '../../store/chatSlice';
import MessageItem from '../../components/MessageItem/MessageItem';


const Home = () => {
  const dispatch = useAppDispatch();
  const messageData = useAppSelector(selectMessageData);
  const getIsLoading = useAppSelector(selectGetIsLoading);
  const lastData = useAppSelector(selectLastDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMessageData()).unwrap();
      } catch (error) {
        console.error(error + 'Произошла ошибка при попытке получия данных с сервера.');
        toast.error('Произошла ошибка при попытке получия данных с сервера.');
      }
    };

    void fetchData();
  }, [dispatch]);


  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await dispatch(fetchLastMessageData(lastData)).unwrap();
      } catch (error) {
        console.error(error + 'Произошла ошибка при попытке получения последнего сообщения с сервера.');
        toast.error('Произошла ошибка при попытке получения последнего сообщения с сервера');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, lastData]);

  return (
    <>
      <Container maxWidth="lg" sx={{mt: 5, mb: 5}}>
        <Typography variant="h3" sx={{fontWeight: '500', mb: 2, fontSize: '40px'}}>Приложение - чат</Typography>

        {getIsLoading && (
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px'}}>
            <CircularProgress/>
          </Box>
        )}

        {!getIsLoading && messageData.length === 0 && (
          <Typography sx={{mb: 1}} variant="body1">Список сообщений пуст. Отправьте что-то...</Typography>
        )}

        {!getIsLoading && messageData.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              maxHeight: '300px',
              overflowX: 'auto',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
              mb: 2,
            }}>
            {messageData.map((item) => (
              <MessageItem key={item.id} data={item}/>
            ))}
          </Box>
        )}
        <ChatForm/>
      </Container>
    </>
  );
};


export default Home;