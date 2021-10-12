import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import Loader from './Loader'
import { useGetNewsQuery } from '../services/newsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [keyword, setKeyword] = useState('cryptocurrency')
	const { data: newsList, isFetching} = useGetNewsQuery({keyword, count: simplified ? 6 : 24});
	const {data: cryptoList } = useGetCryptosQuery(100);
	
	if (isFetching) return <Loader />;

	const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select 
					showSearch
					className="select-news"
					placeholder="Select a Crypto"
					optionFilterProp="children"
					onChange={(value) => setKeyword(value)}
					filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{
							cryptoList?.data?.coins.map(coin => (
								<Option value={coin.name}>{coin.name}</Option>
							))
						}
					</Select>
				</Col>
			)}

			{newsList?.value.map((news, i) => (
			<Col xs={24} sm={12} lg={8} key={i}>
				<Card hoverable className="news-card">
					<a href={news.url} target="_blank" rel="noreferrer" >
						<div className="news-image-container">
							<Title className="news-title" level={4}>{news.name}</Title>
							<img style={{objectFit: "contain"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news thumbnail" />
						</div>
						<p>
							{ news.description.length > 250 ? `${news.description.substring(0, 250)}...` : news.description }
						</p>
						<div className="provider-container">
							<div>
								<Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""></Avatar>
								<Text className="provider-name">
									{news?.provider[0]?.name}
								</Text>
								
							</div>
							<Text> {moment(news?.datePublished).startOf('ss').fromNow()} </Text>
						</div>
						
					</a>
				</Card>
			</Col>
			))}
		</Row>
	)
}

export default News;