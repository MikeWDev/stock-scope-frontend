"use client";

import { deleteAlert } from "@/lib/alerts/deleteAlert";
import { getUserAlerts } from "@/lib/alerts/getUserAlerts";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Alert {
  id: string;
  alertName: string;
  symbol: string;
  targetPrice: number;
  direction: "above" | "below";
  createdAt: { _seconds: number };
}

const Page = () => {
  const [alerts, setAlerts] = useState<Alert[] | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  useEffect(() => {
    async function fetchAlerts() {
      const fetchedAlerts = await getUserAlerts();
      if (fetchedAlerts) {
        setAlerts(fetchedAlerts);
      }
    }

    fetchAlerts();
  }, []);
 

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteAlert(id);
    setAlerts((prev) =>
      prev ? prev.filter((alert) => alert.id !== id) : null
    );
    setDeletingId(null);
  };

  if (!alerts) {
    return (
      <div className="alerts">
        <h1>My alerts</h1>
        <div className="table-grid-border">
          <div className="table-grid-wrapper">
            <div className="table-grid header">
              <div>Alert name</div>
              <div>Stock name</div>
              <div>Target price</div>
              <div>Set at</div>
              <div>Direction</div>
              <div>Action</div>
            </div>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="table-grid row">
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div className="skeleton-box"></div>
                <div>
                  <Trash color="#f27362" strokeWidth={1.5} size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="alerts">
      <h1>My alerts</h1>
      <div className="table-grid-border">
        <div className="table-grid-wrapper">
          <div className="table-grid header">
            <div>Alert name</div>
            <div>Stock name</div>
            <div>Target price</div>
            <div>Set at</div>
            <div>Direction</div>
            <div>Action</div>
          </div>

          {alerts.map((alert) => (
            <div key={alert.id} className="table-grid row">
              <div>{alert.alertName}</div>
              <div>{alert.symbol}</div>
              <div>{alert.targetPrice.toFixed(2)}</div>
              <div>{alert.direction}</div>
              <div>
                {new Date(alert.createdAt._seconds * 1000).toLocaleDateString(
                  "en-GB"
                )}
              </div>
              <div
                onClick={() => handleDelete(alert.id)}
                className={`delete-action ${
                  deletingId === alert.id ? "loading" : ""
                }`}
              >
                <Trash color="#f27362" strokeWidth={1.5} size={20} />
              </div>
            </div>
          ))}

          {alerts.length === 0 && (
            <div className="table-grid row">
              <div>No alerts found.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
