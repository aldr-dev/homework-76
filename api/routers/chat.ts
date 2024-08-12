import express from 'express';
import {Message} from '../types';
import chatDb from '../chatDb';

const chatRouter = express.Router();


chatRouter.get('/', async (req, res) => {
  try {
    const AllMessageData = await chatDb.getItem();

    const queryDate = req.query.datetime as string;

    if (queryDate) {
      const date = new Date(queryDate);

      if (isNaN(date.getDate())) {
        return res.status(400).send({'Ошибка': 'Неверный формат даты'});
      }
      const filteredMessages = AllMessageData.filter(msg => new Date(msg.datetime) > date);

      if (filteredMessages.length !== 0) {
        return res.send(filteredMessages);
      } else {
        return res.send([]);
      }
    }

    return res.send(AllMessageData.slice(-30));

  } catch (error) {
    console.error(error);
    return res.status(500).send({'Ошибка': 'Не удалось получить массив сообщений.'});
  }
});


chatRouter.post('/', async (req, res) => {
  try {
    if (!req.body.author || !req.body.message) {
      return res.status(400).send({'Ошибка': 'В запросе должен быть указан автор и сообщение.'});
    }

    const messageData: Message = {
      author: req.body.author,
      message: req.body.message,
    };

    const saveMessage = await chatDb.addItem(messageData);
    return res.send(saveMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).send({'Ошибка': 'Не удалось записать новые данные.'});
  }
});


export default chatRouter;