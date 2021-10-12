import React, { Fragment } from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import {Cryptocurrencies, News} from '../components'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);

	if (isFetching) return <Loader />;

	return (
		<Fragment>
			<Title level={2} className="Heading"> Global Crypto Stats</Title>
			<Row>
				<Col span={12}> <Statistic title="Total Cryptocurrencies" value={data?.data.stats.total} /> </Col>
				<Col span={12}> <Statistic title="Total Exchanges" value={data?.data.stats.totalExchanges} /> </Col>
				<Col span={12}> <Statistic title="Total Market Cap" value={millify(data?.data?.stats?.totalMarketCap)} /> </Col>
				<Col span={12}> <Statistic title="Total 24h Volume" value={millify(data?.data?.stats?.total24hVolume)} /> </Col>
				<Col span={12}> <Statistic title="Total Markets" value={data?.data.stats.totalMarkets} /> </Col>
			</Row>

			<div className="home-heading-container">
				<Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
				<Title level={3} className="show-more">
					<Link to='/cryptocurrencies'>Show More</Link>
				</Title>
			</div>
			<Cryptocurrencies simplified />
			<div className="home-heading-container">
				<Title level={2} className="home-title">Latest Crypto News</Title>
				<Title level={3} className="show-more">
					<Link to='/news'>Show More</Link>
				</Title>
			</div>
			<News simplified />
		</Fragment>
	)
}

export default Homepage
