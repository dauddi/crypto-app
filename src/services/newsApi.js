import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const newsApiHeaders = {
	'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.NEWS_API_KEY,
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