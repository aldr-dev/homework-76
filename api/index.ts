import express from 'express';
import cors, {CorsOptions} from 'cors';
import chatDb from './chatDb';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

const run = async () => {
  await chatDb.init();

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
  });
};

run().catch(console.error);

