import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IUser} from '../../interfaces';

interface State {
    user: IUser | null; 
}

const initialState: State = {
    user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
})


export const {setUser} = userSlice.actions
export const userReducer =  userSlice.reducer