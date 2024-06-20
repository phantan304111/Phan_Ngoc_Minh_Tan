import React, { useState, useEffect } from "react";
import "./ExchangeForm.css";
const ExchangeForm = () => {
  ////useState to store data
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("BLUR");

  const [result, setResult] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});

  const [error, setError] = useState(null);
  const [showResultText, setShowResultText] = useState(false);
  const [iconSource, setIconSource] = useState(null);
  const [iconTarget, setIconTarget] = useState(null);

  //// function to handdle when changing the inputs
  const handleCurrencyChange = (value, currencyType) => {
    if (currencyType === "source") {
      setSourceCurrency(value);
    } else if (currencyType === "target") {
      setTargetCurrency(value);
    }
  };
  const updateResult = () => {
    /////////Check if the inputs are avaiable, the amount isn't empty,is number and curency data exist
    if (!amount) {
      setError(
        "Please first add the money amount you want to exchange with us"
      );
      setResult(null);
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError("Please give us a positive number only");
      setResult(null);
      return;
    }
    if (!exchangeRates[sourceCurrency] || !exchangeRates[targetCurrency]) {
      setError("one of the currency isn't avaiable at the moment");
      return;
    }
    ////////////caculating the result of the exchange, round it to 4 number after the ,
    const sourceRate = exchangeRates[sourceCurrency];
    const targetRate = exchangeRates[targetCurrency];
    const exchangedAmount = (amount / sourceRate) * targetRate;
    setResult(exchangedAmount.toFixed(4));
    setError(null);
  };
  ////////show the result after press button to confir the exchange
  const handleSubmit = (e) => {
    e.preventDefault();
    updateResult();
    setShowResultText(true);
  };

  ///////update the text show the future result after inputs changed, but ofc not show the real result yet
  useEffect(() => {
    updateResult();
    setShowResultText(false);
  }, [amount, sourceCurrency, targetCurrency]);

  //Fetch the data and handle it from the URL you guys gave me
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) {
          throw new Error("failed to fetch the url");
        }
        const data = await response.json();

        const latestData = data.reduce((acc, curr) => {
          /////// many currency from the URL have same name but different day, so i filter the currency which have lastest day
          if (
            !acc[curr.currency] ||
            new Date(curr.date) > new Date(acc[curr.currency].date)
          ) {
            acc[curr.currency] = curr;
          }
          return acc;
        }, {});
        //// This will be use to make list for the currency inputs, it use the data after filter date
        const options = Object.values(latestData).map((item) => item.currency);
        setCurrencyOptions(options);
        ////the exchange rate for each currency
        const rates = {};
        data.forEach((item) => {
          rates[item.currency] = item.price;
        });
        setExchangeRates(rates);
        //////If we get error
      } catch (error) {
        setError("Failed to fetch data!");
      }
    };
    fetchData();
  }, []);
  ///////I made a log with useEfect to check the exchange Rate here
  // useEffect(() => {
  //   console.log(exchangeRates);
  // }, [exchangeRates]);

  ////////Add currency tokens to the right of the input, which change everytime user change input too
  useEffect(() => {
    const fetchCurrencyIcon = async () => {
      try {
        const iconSource = await import(`../../tokens/${sourceCurrency}.svg`);
        setIconSource(iconSource.default);
      } catch (error) {
        setIconSource(null);
      }
      try {
        const iconTarget = await import(`../../tokens/${targetCurrency}.svg`);
        setIconTarget(iconTarget.default);
      } catch (error) {
        setIconTarget(null);
      }
    };
    fetchCurrencyIcon();
  }, [sourceCurrency, targetCurrency]);

  /////The JSX code this component
  return (
    <div className="ExchangeForm_content">
      <h1 className="ExchangeForm__title">Currency Swap Form</h1>
      {/* The main form */}
      <form onSubmit={handleSubmit}>
        <div className="ExchangeForm__flex__content">
          <label className="ExchangeForm__text">Your Amount :</label>
          <input
            className="ExchangeForm__input__amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="ExchangeForm__flex__content">
          <div className="ExchangeForm__flex__curr">
            <label className="ExchangeForm__text__curr">Your Currency</label>
            <select
              className="ExchangeForm__input__curr"
              value={sourceCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value, "source")}
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {iconSource ? (
              <img
                className="ExchangeForm__icon"
                src={iconSource}
                alt={sourceCurrency}
              />
            ) : (
              ""
            )}
          </div>
          <div className="ExchangeForm__flex__curr">
            <label className="ExchangeForm__text__curr">Target Currency</label>
            <select
              className="ExchangeForm__input__curr"
              value={targetCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value, "target")}
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {iconTarget ? (
              <img
                className="ExchangeForm__icon"
                src={iconTarget}
                alt={sourceCurrency}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="ExchangeForm__result">
          {/* above are the inputs, below are the results */}
          {result !== null && (
            <div className="ExchangeForm__result__layout">
              <label className="ExchangeForm__result__text">
                You will get:{" "}
              </label>
              <input
                className="ExchangeForm__result__result"
                type="text"
                value={`${result} ` + targetCurrency}
                readOnly
              />
            </div>
          )}

          {error && <p className="ExchangeForm__result__error">{error}</p>}
        </div>
        <div className="flex__center">
          <button className="Exchangeform_button" type="submit">
            Exchange!
          </button>
        </div>
      </form>

      <div className="flex__center">
        {showResultText && result !== null && (
          <p className="ExchangeForm__result__amount">
            {`You Got :  ${result}  ` + targetCurrency + ``}
          </p>
        )}
      </div>
    </div>
  );
};
export default ExchangeForm;
