import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export type themeType = 'light' | 'dark';

export type user = {
  username: string;
  id: number;
  token: string;
};

export type userState = {
  user: user | null;
  theme: themeType;
};

const themes = {
  light: 'light' as themeType,
  dark: 'dark' as themeType,
};

const getThemeFromLocalStorage = (): themeType => {
  const theme = (localStorage.getItem('theme') as themeType) || themes.dark;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user);
};

const initialState: userState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out!');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === themes.dark ? themes.light : themes.dark;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
