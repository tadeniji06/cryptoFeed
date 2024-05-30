import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [search, setSearch] = useState("");
  //
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  //
  const searchHandler = async (e) => {
    e.preventDefault();
    //filter coins from API by search input
    const coins = await allCoin.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  //
  useEffect(() => {
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin);
    } else {
      setDisplayCoin([]);
    }
  }, [allCoin]);

  return (
    <div className='home'>
      <div className='hero'>
        <h1>
          Newest <br /> Crypto MarketPlace
        </h1>
        <p>
          Welcome to the latest cryptocurrency marketplace.
          Sign up to explore more about crypto
        </p>
        <form onSubmit={searchHandler}>
          <input
            list='coinlist'
            type='text'
            placeholder='search crypto...'
            required
            value={search}
            onChange={handleSearch}
          />

          <datalist id='coinlist'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='crypto-table'>
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24Hr Change</p>
          <p className='market-cap'>MarketCap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt='' />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol}{" "}
              {item.current_price.toLocaleString()}
            </p>
            <p
              style={{ marginLeft: "35px" }}
              className={
                item.price_change_percentage_24h > 0
                  ? "green"
                  : "red"
              }
            >
              {Math.floor(
                item.price_change_percentage_24h * 100
              ) / 100}
              %
            </p>
            <p className='market-cap'>
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
