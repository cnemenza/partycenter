import themeConfig from '@/config/theme.config';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  sidebar: false,
  theme: themeConfig.theme,
  menu: themeConfig.menu,
  layout: themeConfig.layout,
  rtlClass: themeConfig.rtlClass,
  animation: themeConfig.animation,
  navbar: themeConfig.navbar,
  locale: themeConfig.locale,
  semidark: themeConfig.semidark
};

const themeConfigSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    }
  }
});

export const { toggleSidebar } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
