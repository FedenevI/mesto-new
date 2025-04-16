import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ICard} from '../../interfaces/index'


interface State {
  cards: ICard[]
}

const initialState: State = {
  cards: [],
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload
    },
  },
})


export const {setCards} = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer