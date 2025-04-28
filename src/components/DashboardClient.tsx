"use client";

import { useEffect, useState } from "react";
import { getStocks } from "@/lib/stocks-actions/getStocks";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Stock } from "../../types";

const DashboardClient = () => {
  const [stocks, setStocks] = useState<Stock[] | null>(null);

  useEffect(() => {
    async function fetchStocks() {
      const data = await getStocks();

      if (!data) {
        toast.error("Failed to load stocks");
      } else {
        setStocks(data);
      }
    }

    fetchStocks();
  }, []);

  if (!stocks) {
    return (
      <div className="dashboard">
        <h1>Overview</h1>
        <div className="table-grid-border">
          <div className="table-grid-wrapper">
            <div className="table-grid header">
              <div>Stock name</div>
              <div>Symbol</div>
              <div>Current price</div>
              <div>% Change</div>
              <div>High</div>
              <div>Low</div>
            </div>

          
            {[...Array(5)].map((_, i) => (
              <div key={i} className="table-grid row">
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Overview</h1>
      <div className="table-grid-border">
        <div className="table-grid-wrapper">
          <div className="table-grid header">
            <div>Stock name</div>
            <div>Symbol</div>
            <div>Current price</div>
            <div>% Change</div>
            <div>High</div>
            <div>Low</div>
          </div>

          {stocks.map((stock: Stock) => (
            <Link
              key={stock.symbol}
              href={`/dashboard/${stock.symbol}`}
              className="table-grid row"
            >
              <div>{stock.name}</div>
              <div>{stock.symbol}</div>
              <div>{stock.currentPrice.toFixed(2)}</div>
              <div
                className={
                  parseFloat(stock.percentChange) >= 0 ? "positive" : "negative"
                }
              >
                {stock.percentChange}%
              </div>
              <div>{stock.high.toFixed(2)}</div>
              <div>{stock.low.toFixed(2)}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
