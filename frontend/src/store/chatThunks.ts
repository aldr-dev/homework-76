import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {MessageData, MessageForm} from '../types';
import {RootState} from '../app/store';

export const fetchMessageData = createAsyncThunk<MessageData[], void, {state: RootState}>(
  'chat/fetchMessageData', async () => {
    const response = await axiosApi.get<MessageData[]>('/messages');
    return response.data;
  }
);

export const postMessageData = createAsyncThunk<void, MessageForm, {state: RootState}>(
  'chat/postMessageData', async (data) => {
    await axiosApi.post<MessageForm>('/messages', data);
  }
);

export const fetchLastMessageData = createAsyncThunk<MessageData[], string, {state: RootState}>(
  'chat/fetchLastMessageData', async (date) => {
   const response = await axiosApi.get<MessageData[]>(`/messages?datetime=${date}`);
   return response.data;
  }
);