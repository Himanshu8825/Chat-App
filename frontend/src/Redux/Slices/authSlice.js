import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload; // Update user info in state
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state
    },
    setError: (state, action) => {
      state.error = action.payload; // Set error state
    },
  },
});

export const { setUserInfo, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
