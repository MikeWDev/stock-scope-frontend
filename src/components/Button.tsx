import React from "react";

type ButtonProps = {
  type?: "submit" | "button" | "reset";
  text: string;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
};

const Button = ({
  type = "button",
  text,
  loading = false,
  onClick,
  className = "",
}: ButtonProps) => {
  return (
    <div className="btn-wrapper">
      <button
        disabled={loading}
        className={`btn ${className} ${loading ? "loading" : ""}`}
        type={type}
        onClick={onClick}
      >
        {loading ? <span className="spinner"></span> : text}
      </button>
    </div>
  );
};

export default Button;
