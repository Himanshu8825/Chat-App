import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedChatType: 'undefined',
  selectedChatData: 'undefined',
  selectedChatMessages: [],
  closeChat: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatType: (state, action) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (state, action) => {
      state.selectedChatData = action.payload;
    },
    setSelectedChatMessages: (state, action) => {
      state.selectedChatMessages = action.payload;
    },
    closeChat: (state) => {
      console.log('closeChat reducer invoked');
      state.selectedChatType = 'undefined';
      state.selectedChatData = 'undefined';
      state.selectedChatMessages = [];
    },
  },
});

export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  closeChat,
} = chatSlice.actions;
export default chatSlice.reducer;
