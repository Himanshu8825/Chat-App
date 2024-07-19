import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice.js';
import chatReducer from './Slices/chatSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
