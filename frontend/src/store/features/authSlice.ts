import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IssueInitialState {
  role: string;
  fullName: string;
}

const initialState: IssueInitialState = {
  role: '',
  fullName: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserAuth(state, action: PayloadAction<IssueInitialState>) {
      state.role = action.payload?.role;
      state.fullName = action.payload?.fullName;
    },
    removeUserAuth(state) {
      state = initialState;
    }
  }
});

export const { setUserAuth, removeUserAuth } = authSlice.actions;

export default authSlice.reducer;
