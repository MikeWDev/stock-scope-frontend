"use client";

import { Bell } from "lucide-react";
import React, { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { saveAlert } from "@/lib/alerts/saveAlert";

type Direction = "above" | "below";

interface SetAlertBoxProps {
  symbol: string;
}

const SetAlertBox = ({ symbol }: SetAlertBoxProps) => {
  const [alertName, setAlertName] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [direction, setDirection] = useState<Direction>("above");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertName || !targetPrice) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await saveAlert({
        symbol,
        targetPrice: Number(targetPrice),
        alertName,
        direction,
      });
      setAlertName("");
      setTargetPrice("");
      setDirection("above");
      toast.success("Alert set successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to set alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-alert">
      <div className="heading">
        <div className="icon">
          <Bell size={26} />
        </div>
        <p>Set price alert for this stock</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Alert name"
          value={alertName}
          onChange={(e) => setAlertName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target price"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
        />

        <div className="direction-select">
          <label>
            <input
              type="radio"
              name="direction"
              value="above"
              checked={direction === "above"}
              onChange={() => setDirection("above")}
            />
            Above
          </label>
          <label>
            <input
              type="radio"
              name="direction"
              value="below"
              checked={direction === "below"}
              onChange={() => setDirection("below")}
            />
            Below
          </label>
        </div>

        <Button
          type="submit"
          text="Set Alert"
          loading={loading}
          className="outline"
        />
      </form>
    </div>
  );
};

export default SetAlertBox;
