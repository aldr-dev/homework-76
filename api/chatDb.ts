import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Message, MessageData} from './types';

const fileName = './db.json';
let data: MessageData[] = [];

const chatDb = {
  async init() {
    try {
      const fileContent = await fs.readFile(fileName);
      data = JSON.parse(fileContent.toString());
    } catch (error) {
      console.error(error);
      data = [];
    }
  },
  async getItem() {
    return data;
  },
  async addItem(item: Message) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    const newMessage = {id, ...item, datetime};
    data.push(newMessage);
    await this.save();
    return newMessage;
  },
  async save() {
    return fs.writeFile(fileName, JSON.stringify(data));
  }
};

export default chatDb;