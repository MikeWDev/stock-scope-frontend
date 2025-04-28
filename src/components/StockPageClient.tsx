"use client";

import { useEffect, useState } from "react";
import { getStock } from "@/lib/stocks-actions/getStock";
import StockCard from "@/components/StockCard";
import StockGraph from "@/components/StockGraph";
import SetAlertBox from "@/components/SetAlertBox";
import {
  BadgeDollarSign,
  DollarSign,
  FolderPen,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { Stock } from "../../types";

interface StockPageClientProps {
  symbol: string;
}

const StockPageClient = ({ symbol }: StockPageClientProps) => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStock() {
      try {
        const result = await getStock(symbol);

        if (!result) {
          toast.error("Failed to load stock data");
        } else {
          setStock(result);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchStock();
  }, [symbol]);

  return (
    <div className="stock-preview">
      <div className="stock-data-con">
        <StockCard
          type="name"
          title="Stock Name"
          icon={FolderPen}
          value={stock?.name || ""}
          isLoading={isLoading}
        />
        <StockCard
          type="symbol"
          title="Stock Symbol"
          icon={BadgeDollarSign}
          value={stock?.symbol || ""}
          isLoading={isLoading}
        />
        <StockCard
          type="price"
          title="Current Price"
          icon={DollarSign}
          value={stock ? `$${stock.currentPrice.toFixed(2)}` : ""}
          isLoading={isLoading}
        />
        <StockCard
          type={
            stock && parseFloat(stock.percentChange) >= 0
              ? "change up"
              : "change down"
          }
          title="Change Today"
          icon={
            stock && parseFloat(stock.percentChange) >= 0
              ? TrendingUp
              : TrendingDown
          }
          value={stock ? `${stock.percentChange}%` : ""}
          isLoading={isLoading}
        />
      </div>

      <StockGraph stock={stock} isLoading={isLoading} />
      <SetAlertBox symbol={symbol} />
    </div>
  );
};

export default StockPageClient;
