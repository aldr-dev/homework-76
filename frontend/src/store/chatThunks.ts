import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {MessageData, MessageForm} from '../types';
import {RootState} from '../app/store';

export const fetchMessageData = createAsyncThunk<MessageData[] | null, void, {state: RootState}>(
  'chat/fetchMessageData', async () => {
    const response = await axiosApi.get<MessageData[]>('/messages');

    if (response.data !== null) {
      return response.data;
    } else {
      return [];
    }
  }
);

export const postMessageData = createAsyncThunk<void, MessageForm, {state: RootState}>(
  'chat/postMessageData', async (data) => {
    await axiosApi.post<MessageForm>('/messages', data);
  }
);