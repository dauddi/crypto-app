import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
	'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.CRYPTO_API_KEY,
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?x-access-token=i-have-to-migrate-to-v2&limit=${count}`)
		}),
		getCryptoDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}?x-access-token=i-have-to-migrate-to-v2`)
		}),
		getCryptoHistory: builder.query({
			query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}?x-access-token=i-have-to-migrate-to-v2`)
		})
	})
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;