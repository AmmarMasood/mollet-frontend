import React from "react";
import Loader from "../Loader";

function LiveStocksPrices({ stocks }) {
  return (
    <div style={{ marginTop: "50px" }}>
      <h2 style={{ color: "var(--primary-dark-blue)" }}>Live Stock Prices</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {stocks.map((stock) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "20px",
              marginBottom: "30px",
              // border: "2px solid black",
              padding: "10px",
              background: "#ededed",
              borderRadius: "10px",
              color: "var(--primary-dark-blue)",
            }}
          >
            <span style={{ fontSize: "18px" }}>{stock.company_name}</span>
            {stock.price ? (
              <>
                <span style={{ fontSize: "14px" }}>{stock.sector}</span>
                <div style={{ fontSize: "16px" }}>
                  {stock.price}{" "}
                  <span
                    style={{
                      color: parseInt(stock.change) <= 0 ? "red" : "green",
                      fontSize: "14px",
                    }}
                  >
                    {stock.change}
                    {stock.changePercentage}
                  </span>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveStocksPrices;
