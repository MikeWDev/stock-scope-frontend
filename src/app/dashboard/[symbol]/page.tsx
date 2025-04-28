import StockPageClient from "@/components/StockPageClient";
import React from "react";

interface PageProps {
  params: {
    symbol: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { symbol } = params;

  return (
    <div>
      <StockPageClient symbol={symbol} />
    </div>
  );
};

export default Page;
