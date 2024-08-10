export interface Message {
  author: string;
  message: string;
}

export interface MessageData extends Message {
  id: string;
  datetime: string;
}