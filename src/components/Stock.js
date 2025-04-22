import React from "react";

function Stock({ stock, onStockClick, action }) {
  return (
    <div className="stock" onClick={() => onStockClick(stock)}>
      <div className="stock-info">
        <h3>{stock.ticker}</h3>
        <p>{stock.name}</p>
        <p>Price: ${stock.price}</p>
        <p>Type: {stock.type}</p>
      </div>
      <div className="stock-action">
        <button>{action}</button>
      </div>
    </div>
  );
}

export default Stock;