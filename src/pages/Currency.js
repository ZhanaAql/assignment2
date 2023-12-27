import Table from "react-bootstrap/Table";
import React, { useState, useEffect, useId } from "react";

function ExchangeRates() {
  const [currency, setCurrency] = useState([]);

  const fetchExchangeRates = async () => {
    const API_KEY = "7760447ef36a44be9f0a98c07bb79402";
    const BASE_URL = "https://api.currencyfreaks.com/v2.0/rates/latest";
    const mataUang = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
    try {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}`);

      const data = await res.json();

      const rates = data.rates;
      const baseCurrencyUsd = 1 / parseFloat(rates.USD);
      const kurs = mataUang.map((nilai) => ({
        nilai,
        id: nilai,
        exchangeRates: baseCurrencyUsd * parseFloat(rates[nilai]),
        weBuy: baseCurrencyUsd * parseFloat(rates[nilai]) * 1.05,
        weSell: baseCurrencyUsd * parseFloat(rates[nilai]) * 0.95,
      }));
      setCurrency(kurs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currency.map((nilai) => {
            console.log(nilai);
            return (
              <tr key={nilai.id}>
                <td>{nilai.nilai}</td>
                <td>{nilai.weBuy.toFixed(2)}</td>
                <td>{nilai.exchangeRates.toFixed(2)}</td>
                <td>{nilai.weSell.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default ExchangeRates;
