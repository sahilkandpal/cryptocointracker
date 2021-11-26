import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={3} className="heading">
        Global Cryptocurrency Statistics
      </Title>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 32]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
            />
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
            />
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats.total24hVolume)}
            />
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Card>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top Cryptocurrencies in the world
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies" style={{ color: "inherit" }}>
            Show More
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news" style={{ color: "inherit" }}>
            Show More
          </Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
