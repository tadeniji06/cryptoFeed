import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-zFyHnEDkBvMm5QWUvytv98GW",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-zFyHnEDkBvMm5QWUvytv98GW",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching historical data:", err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (!coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }

  const { market_data } = coinData;
  const currentPrice =
    market_data?.current_price?.[currency.name];
  const marketCap =
    market_data?.market_cap?.[currency.name];
  const high24 = market_data?.high_24h?.[currency.name];
  const low24 = market_data?.low_24h?.[currency.name];

  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image.large} alt='' />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()}
            )
          </b>
        </p>
      </div>
      <div className='coin-chart'>
        <LineChart historicalData={historicalData} />
      </div>

      <div className='coin-info'>
        <ul>
          <li>Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Market Price</li>
          <li>
            {currency.symbol}
            {currentPrice
              ? currentPrice.toLocaleString()
              : "N/A"}
          </li>
        </ul>

        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {marketCap ? marketCap.toLocaleString() : "N/A"}
          </li>
        </ul>

        <ul>
          <li>24 Hour high</li>
          <li>
            {currency.symbol}
            {high24 ? high24.toLocaleString() : "N/A"}
          </li>
        </ul>

        <ul>
          <li>24 Hour low</li>
          <li>
            {currency.symbol}
            {low24 ? low24.toLocaleString() : "N/A"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
