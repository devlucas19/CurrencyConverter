import { useState, useEffect } from "react";
import axios from "axios";
import exchangeIcon from "./assets/icons/exchange.png";

function App() {
  const [dolarValue, setDolarValue] = useState(0);
  const [euroValue, setEuroValue] = useState(0);
  const [inputValue, setInputValue] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [currencyConverted, setCurrencyConverted] = useState(0);

  useEffect(() => {
    axios
      .get("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL")
      .then((response) => {
        setDolarValue(response.data.USDBRL.ask);
        setEuroValue(response.data.EURBRL.ask);
      });
  }, []);

  const convert = () => {
    if (inputValue === undefined) {
      return;
    } else {
      if (selectedCurrency === "USD") {
        setCurrencyConverted(inputValue / dolarValue);
      } else if (selectedCurrency === "EUR") {
        setCurrencyConverted(inputValue / euroValue);
      }
    }
  };

  return (
    <div className="App">
      <div className="main-text">
        <h1 className="introduction">View and convert in real time!</h1>
        <h1 className="currency-value">{`$${dolarValue} | €${euroValue}`}</h1>
      </div>

      <div className="convertion-container">
        <div className="value-divs">
          <label>Convert Value</label>
          <div>
            <span>R$</span>
            <input
              className="input-value"
              type="number"
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <ul>
          <li className="dropdown">
            <a href="#" className="dropbtn">
              {selectedCurrency}
            </a>
            <div className="dropdown-content">
              <a
                href="#"
                onClick={() => {
                  setSelectedCurrency(
                    selectedCurrency === "USD" ? "EUR" : "USD"
                  );
                }}
              >
                {selectedCurrency === "USD" ? "EUR" : "USD"}
              </a>
            </div>
          </li>
        </ul>
        <button onClick={convert}>
          <img src={exchangeIcon} alt="tranfer icon" height="30px"></img>
        </button>

        <div className="value-divs" id="result">
          <label>Result</label>
          <div>
            <span className="result">
              {selectedCurrency === "USD"
                ? `$${currencyConverted.toFixed(2)}`
                : `€${currencyConverted.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
