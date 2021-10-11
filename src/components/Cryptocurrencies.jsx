import React, {Fragment, useState, useEffect} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
	const count = simplified ? 10 : 100;
	
	const {data: cryptoList, isFetching} = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		let coinsArray = cryptoList?.data?.coins;
		const filteredData = coinsArray?.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

		setCryptos(filteredData)
	}, [cryptoList, searchTerm])

	if (isFetching) return "Loading...";

	const searchInputHandler = (event) => {
		setSearchTerm(event.target.value)
	}

	return (
		<Fragment>
			{!simplified && (
				<div className="search-crypto" >
					<Input placeholder="Search Cryptocurrency" onChange={searchInputHandler} />
				</div>
			)}

			<Row gutter={[32, 32]} className="crypto-card-container">
				{cryptos?.map(crypto => (
					<Col xs={24} sm={12} lg={6} className="crypto-card" key ={crypto.id}>
						<Link to={`/crypto/${crypto.id}`}>
							<Card 
								title={`${crypto.rank}. ${crypto.name}`} 
								extra={<img className="crypto-image" src={crypto.iconUrl} alt="cryptocurrency icons" />}
								hoverable
							>
								<p>Price: $ {millify(crypto.price)} </p>
								<p>Market Cap: $ {millify(crypto.marketCap)} </p>
								<p style={{color:` ${(crypto.change < 0) ? "red" : "green"}  `}}>Daily Change: $ {millify(crypto.change)} </p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</Fragment>
	)
}

export default Cryptocurrencies
