import { createContext, useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-zFyHnEDkBvMm5QWUvytv98GW",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((response) => setAllCoin(response))
      .catch((error) =>
        toast.error(
          `Error fetching coins: ${error.message}`
        )
      );
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <>
      <CoinContext.Provider value={contextValue}>
        {props.children}
      </CoinContext.Provider>

      <Toaster richColors />
    </>
  );
};

export default CoinContextProvider;
