import React, { useCallback, useState } from "react";
import "./index.css";

export default function StockData() {

  // search date state
  const [searchDate, setSearchDate] = useState("");
  // avoid same request
  const [isSending, setIsSending] = useState(false);
  // fecthing result status
  const [fetchSuccess, setFetchSuccess] = useState(false);
  // fetched stock data
  const [data, setData] = useState({});

  // send request asynchronously
  const sendRequest = useCallback(async () => {
    if(isSending) return;

    setIsSending(true);
    setFetchSuccess(false);
    setData({});

    const response = await fetch('https://jsonmock.hackerrank.com/api/stocks?date=' 
      + searchDate.replace(/(^|-)0+/g, "$1"));
    const jsonData = await response.json();

    if(jsonData.data.length > 0) {
      setData(jsonData.data[0]);
      setFetchSuccess(true);
    }

    setIsSending(false);

  }, [isSending, searchDate, setIsSending]);

  // render stock datas
  const renderStocks = () => {
    return (
      <>
        <ul 
          className="mt-50 slide-up-fade-in styled"
          id="stockData"
          data-testid="stock-data">
          <li className="py-10">Open: {data.open}</li>
          <li className="py-10">Close: {data.close}</li>
          <li className="py-10">High: {data.high}</li>
          <li className="py-10">Low: {data.low}</li>
        </ul>
      </>
    )
  };

  // render no result data
  const renderNoResult = () => {
    return (
      <div 
          className="mt-50 slide-up-fade-in"
          id="no-result"
          data-testid="no-result">
          <p>No Results Found</p>
      </div>
    )
  }

  // render main view
  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input 
          type="text" 
          className="large" 
          placeholder="5-January-2000" 
          id="app-input" 
          data-testid="app-input"
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}/>
        <button 
          className="" 
          id="submit-button" 
          data-testid="submit-button" 
          onClick={sendRequest}
        >
          Search
        </button>
      </section>

      { fetchSuccess && renderStocks() }
      { !fetchSuccess && !isSending && renderNoResult() }
    
    </div>
  );
}
