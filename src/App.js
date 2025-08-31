import React, { useState, useEffect } from "react";
import "./App.css";

const currencyOptions = ["USD", "EUR", "GBP", "PKR", "JPY", "CAD"];

// Hardcoded example rates (USD as base)
const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.81,
  PKR: 285,
  JPY: 149,
  CAD: 1.35
};

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Conversion function
  const convert = () => {
    try {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (error) {
      console.error("Conversion failed:", error);
      setConvertedAmount("Conversion failed");
    }
  };

  // Live update whenever amount or currencies change
  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency]);

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
