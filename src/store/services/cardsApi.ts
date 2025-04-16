
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCards } from '../slices/cardsSlice';
import {ICard} from '../../interfaces/index';

type CardsResponse = ICard[];


// 9204a9cc-6a48-46ae-b1bd-54502917751b

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    prepareHeaders: (headers) => {
      headers.set('Authorization', '980f7983-d65e-4e45-9077-8ccb5ac74fe6');
      return headers;
    },
  }),
  tagTypes: ['Cards'],
  endpoints: (builder) => ({
    getCards: builder.query<CardsResponse, void>({
        query: () => '/cards',
        providesTags: ['Cards'],
        async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
          try {
            const result = await queryFulfilled;
            dispatch(setCards(result.data))
          } catch (error) {
            console.error('Ошибка при загрузке карточек:', error);
          }
        }
    }),
    addNewCard: builder.mutation<void, { name: string; link: string }>({
        query: (data) => ({
          url: '/cards',
          method: 'POST',
          body: {
            name: data.name,
            link: data.link,
          },
        }),
        invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<void, string>({
        query: (cardID) => ({
          url: `/cards/${cardID}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
    }),
    addLike: builder.mutation<ICard, string>({
        query: (cardID) => ({
          url: `/cards/${cardID}/likes`,
          method: 'PUT',
        }),
    }),
    deleteLike: builder.mutation<ICard, string>({
        query: (cardID) => ({
          url: `/cards/${cardID}/likes`,
          method: 'DELETE',
        }),
    }),
  }),
})

export const {
    useGetCardsQuery,
    useAddNewCardMutation,
    useDeleteCardMutation,
    useAddLikeMutation,
    useDeleteLikeMutation,
} = cardsApi;