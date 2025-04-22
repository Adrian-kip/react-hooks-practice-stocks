import React, { useState, useEffect } from "react";
import Stock from "./Stock";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("none");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  const handleBuyStock = (stock) => {
    if (!portfolio.some((s) => s.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter((stock) => {
    if (filterBy === "All") return true;
    return stock.type === filterBy;
  });

  return (
    <div>
      <div className="filter-sort">
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Health">Health</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">None</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="stocks-container">
        <div className="stock-list">
          <h2>Available Stocks</h2>
          {filteredStocks.map((stock) => (
            <Stock
              key={stock.id}
              stock={stock}
              onStockClick={handleBuyStock}
              action="Buy"
            />
          ))}
        </div>

        <div className="portfolio">
          <h2>My Portfolio</h2>
          {portfolio.map((stock) => (
            <Stock
              key={stock.id}
              stock={stock}
              onStockClick={handleSellStock}
              action="Sell"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;