import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
	'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'f9671e5427msha190c003984e4ecp18b998jsn5e26888e144b'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: newsApiHeaders})

export const newsApi = createApi({
	reducerPath: 'newsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getNews: builder.query({
			query: ({ keyword, count }) => createRequest(`/news/search?q=${keyword}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
		})
	})
})

export const { useGetNewsQuery } = newsApi;