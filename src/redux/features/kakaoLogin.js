import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kakaoLoginApi = createApi({
  reducerPath: 'kakaoLoginApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    // 로그인한 유저 토큰 받기
    getUserToken: builder.mutation({
      query: (code) => {
        const tokenData = {
          grant_type: 'authorization_code',
          client_id: `${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          redirect_uri: 'http://localhost:5173/third',
          code,
        };
        const params = new URLSearchParams(tokenData);

        return {
          url: 'https://kauth.kakao.com/oauth/token',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          body: params.toString(),
        };
      },
    }),

    // 로그인한 유저 토큰 정보 받기
    getUserTokenInfo: builder.query({
      query: (access_token) => ({
        url: 'https://kapi.kakao.com/v1/user/access_token_info',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),

    logoutKakao: builder.mutation({
      query: (access_token) => ({
        url: 'https://kapi.kakao.com/v1/user/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserTokenMutation,
  useGetUserTokenInfoQuery,
  useLogoutKakaoMutation,
} = kakaoLoginApi;
