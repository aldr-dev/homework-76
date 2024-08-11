import {MessageData} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchLastMessageData, fetchMessageData, postMessageData} from './chatThunks';

export interface ChatState {
  messageData: MessageData[];
  getIsLoading: boolean;
  postIsLoading: boolean;
  getLastIsLoading: boolean;
  datetime: string;
}

const initialState: ChatState = {
  messageData: [],
  getIsLoading: false,
  postIsLoading: false,
  getLastIsLoading: false,
  datetime: '',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postMessageData.pending, (state) => {
      state.postIsLoading = true;
    });
    builder.addCase(postMessageData.fulfilled, (state) => {
      state.postIsLoading = false;
    });
    builder.addCase(postMessageData.rejected, (state) => {
      state.postIsLoading = false;
    });

    builder.addCase(fetchMessageData.pending, (state) => {
      state.getIsLoading = true;
    });
    builder.addCase(fetchMessageData.fulfilled, (state, {payload: data}) => {
      state.getIsLoading = false;
      state.messageData = data;
      if (state.messageData.length > 0) {
        state.datetime = state.messageData[state.messageData.length - 1].datetime;
      }
    });
    builder.addCase(fetchMessageData.rejected, (state) => {
      state.getIsLoading = false;
    });

    builder.addCase(fetchLastMessageData.pending, (state) => {
      state.getLastIsLoading = true;
    });
    builder.addCase(fetchLastMessageData.fulfilled, (state, {payload: lastDateData}) => {
      state.getLastIsLoading = false;
      if (lastDateData.length !== 0) {
        state.messageData.push(lastDateData[0]);
        state.datetime = lastDateData[0].datetime;
      }
    });
    builder.addCase(fetchLastMessageData.rejected, (state) => {
      state.getLastIsLoading = false;
    });
  },
  selectors: {
    selectMessageData: (state) => state.messageData,
    selectGetIsLoading: (state) => state.getIsLoading,
    selectPostIsLoading: (state) => state.postIsLoading,
    selectLastDate: (state) => state.datetime,
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  selectMessageData,
  selectGetIsLoading,
  selectPostIsLoading,
  selectLastDate
} = chatSlice.selectors;