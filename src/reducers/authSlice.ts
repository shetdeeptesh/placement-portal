import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  email: string;
  name: string;
  // Add more user-related fields here
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  role: 'user' | 'admin' | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  role: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<Required<{ user: User; token: string; role: 'user' | 'admin' }>>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});


export const { login, logout } = authSlice.actions;

export default authSlice;
