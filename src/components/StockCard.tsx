import React from "react";

type StockCardProps = {
  title: string;
  icon: React.ElementType;
  value: string | number | null;
  type: string;
  isLoading?: boolean;
};

const StockCard = ({
  title,
  icon: Icon,
  value,
  type,
  isLoading,
}: StockCardProps) => {
  return (
    <div className="data-card">
      <div className="label">
        <div className={`icon ${type}`}>
          <Icon size={26} />
        </div>
        <p>{title}</p>
      </div>
      <div className="value">
        {isLoading ? (
          <div className="skeleton-box stock-card"></div>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
};

export default StockCard;
