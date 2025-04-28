"use client";

import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { History } from "lucide-react";
import "../lib/charts/chartjsSetup";
import { Stock } from "../../types";
import { Chart } from "chart.js";

interface StockGraphProps {
  stock: Stock | null;
  isLoading: boolean;
}

interface Point {
  time: string;
  price: number;
}

const StockGraph = ({ stock, isLoading }: StockGraphProps) => {
  const chartRef = useRef<Chart<"line">>(null);
  const [gradient, setGradient] = useState<string | CanvasGradient>("#3679f5");

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const grad = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
      grad.addColorStop(0, "#3679f5");
      grad.addColorStop(0.5, "#9f19f5");
      grad.addColorStop(1, "#9c4bf8");
      setGradient(grad);
    }
  }, []);

  if (isLoading || !stock) {
    return (
      <div className="stock-graph">
        <div className="graph-title">
          <div className="icon">
            <History size={26} />
          </div>
          <p>Price range for today:</p>
        </div>
        <div className="chart-wrapper">
          <div className="skeleton-box graph"></div>
        </div>
      </div>
    );
  }

  const previousClose =
    stock.currentPrice / (1 + Number(stock.percentChange) / 100);

  const chartData: Point[] = [
    { time: "Previous Close", price: previousClose },
    { time: "Low", price: stock.low },
    { time: "High", price: stock.high },
    { time: "Current", price: stock.currentPrice },
  ];

  const data = {
    labels: chartData.map((point) => point.time),
    datasets: [
      {
        label: "Price over time",
        data: chartData.map((point) => point.price),
        fill: false,
        borderColor: gradient,
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          padding: 10,
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
      y: {
        ticks: {
          color: "#ccc",
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "#1f1f2e",
        titleColor: "#ccc",
        bodyColor: "#fff",
        borderColor: "rgba(54,121,245,0.5)",
        borderWidth: 1,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="stock-graph">
      <div className="graph-title">
        <div className="icon">
          <History size={26} />
        </div>
        <p>Price range for today:</p>
      </div>
      <div className="chart-wrapper">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default StockGraph;
