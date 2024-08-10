export interface MessageForm {
  author: string;
  message: string;
}

export interface MessageData extends MessageForm {
  id: string;
  datetime: string;
}