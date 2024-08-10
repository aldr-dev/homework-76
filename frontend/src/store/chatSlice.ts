import {MessageData} from '../types';
import {createSlice} from '@reduxjs/toolkit';

export interface ChatState {
  messageData: MessageData[];
  getIsLoading: boolean;
  postIsLoading: boolean;
}

const initialState: ChatState = {
  messageData: [],
  getIsLoading: false,
  postIsLoading: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  selectors: {
    selectMessageData: (state) => state.messageData,
    selectGetIsLoading: (state) => state.getIsLoading,
    selectPostIsLoading: (state) => state.postIsLoading,
  },
});

export const chatReducer = chatSlice.reducer;
export const {
  selectMessageData,
  selectGetIsLoading,
  selectPostIsLoading,
} = chatSlice.selectors;