import ChatForm from '../../components/ChatForm/ChatForm';
import {Container, Typography} from '@mui/material';
// import ChatMessageBox from '../../components/ChatMessageBox/ChatMessageBox';


const Home = () => {
  return (
    <>
      {/*<LinearProgress variant="determinate" value={progress} />*/}
      <Container maxWidth="lg" sx={{mt: 5, mb: 5}}>
        <Typography variant="h3" sx={{fontWeight: '500', mb: 2, fontSize: '40px'}}>Приложение - чат</Typography>
        {/*<ChatMessageBox/>*/}
        <ChatForm/>
      </Container>
    </>
  );
};

export default Home;