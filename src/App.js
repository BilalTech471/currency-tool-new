import React, { useState, useEffect } from "react";
import "./App.css";

// Yahan aap apni pasand ki aur currencies add kar sakte hain
const currencyOptions = [
  "USD",
  "EUR",
  "GBP",
  "PKR",
  "JPY",
  "CAD",
  "AUD", // Australian Dollar
  "NZD", // New Zealand Dollar
  "SGD", // Singapore Dollar
  "HKD", // Hong Kong Dollar
  "INR", // Indian Rupee
  "AED", // UAE Dirham
];

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [liveRates, setLiveRates] = useState({});

  // CurrencyFreaks API se rates fetch karne ka function
  const fetchRates = async () => {
    try {
      const apiKey = "65506dff0a814c2d96e49007ca2056cd";
      const response = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${currencyOptions.join(',')}`
      );
      const data = await response.json();

      if (data.rates) {
        setLiveRates(data.rates);
      } else {
        console.error("API se rates nahi aaye:", data.error);
      }
    } catch (error) {
      console.error("Rates fetch karne mein error:", error);
    }
  };

  // Jab app load ho to rates fetch karo
  useEffect(() => {
    fetchRates();
  }, []);

  // Conversion function
  const convert = () => {
    if (liveRates[toCurrency] && liveRates[fromCurrency]) {
      const rateFromBase = liveRates[toCurrency] / liveRates[fromCurrency];
      setConvertedAmount((amount * rateFromBase).toFixed(2));
    }
  };

  // Jab bhi amount ya currencies change hon, conversion karo
  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency, liveRates]);

  // Swap currencies
  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      convert();
    }
  };

  return (
    <div className="app">
      <h1>💱 Currency Converter</h1>
      <div className="converter">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencyOptions.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <button className="swap-btn" onClick={swapCurrencies}>
          ⇄
        </button>

        <div className="input-group">
          <input type="text" value={convertedAmount} readOnly />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencyOptions.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="convert-btn" onClick={convert}>
        Convert
      </button>
    </div>
  );
}

export default App;
