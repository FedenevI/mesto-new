import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../slices/userSlice';
import {IUser} from '../../interfaces';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
    prepareHeaders: (headers) => {
        headers.set('Authorization', '980f7983-d65e-4e45-9077-8ccb5ac74fe6');
        return headers;
      },
   }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUser, void>({
      query: () => '/users/me',
      providesTags: ['User'],
        async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
          try {
            const result = await queryFulfilled;
            dispatch(setUser(result.data))
          } catch (error) {
                console.error('Ошибка при загрузке информации о пользователе:', error);
          }
        }
      }),
    setInfoProfile: builder.mutation<void, Partial<IUser>>({
      query: (data) => ({
        url: '/users/me',
        method: 'PATCH',
        body: {
          name: data.name,
          about: data.about,
        },
      }),
      invalidatesTags: ['User']
    }),
    setInfoAvatar: builder.mutation<void, { avatar: string }>({
      query: (data) => ({
        url: '/users/me/avatar',
        method: 'PATCH',
        body: {
          avatar: data.avatar,
        },
      }),
      invalidatesTags: ['User']
    }),
  }),
})


export const { 
    useGetUserInfoQuery,
    useSetInfoProfileMutation,
    useSetInfoAvatarMutation,
    } = userApi;