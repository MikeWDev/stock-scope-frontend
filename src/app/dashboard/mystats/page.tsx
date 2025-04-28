"use client";

import { getUserStats } from "@/lib/stats/getStats";
import { waitForAuthReady } from "@/lib/firebase/firebase"; 
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";

interface UserStat {
  id: string;
  route: string;
  count: number;
  email: string;
  lastRequest: { _seconds: number };
}

const Page = () => {
  const [stats, setStats] = useState<UserStat[] | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [showAllStats, setShowAllStats] = useState<boolean>(false);
  useEffect(() => {
    async function fetchStats() {
      const user = await waitForAuthReady();
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      setCurrentUserEmail(user.email);

      const fetchedStats = await getUserStats();
      if (fetchedStats) {
        setStats(fetchedStats);
      }
    }

    fetchStats();
  }, []);

  

  if (!stats || !currentUserEmail) {
    return (
      <div className="stats">
        <h1>{showAllStats ? "All API Usage Stats" : "My API Usage Stats"}</h1>
        <div className="btn-con">
          <Button
            text="My stats"
            className={!showAllStats ? "outline active" : "outline"}
            onClick={() => setShowAllStats(false)}
          />
          <Button
            text="All stats"
            className={showAllStats ? "outline active" : "outline"}
            onClick={() => setShowAllStats(true)}
          />
        </div>
        <div className="table-grid-border">
          <div className="table-grid-wrapper">
            <div className="table-grid header">
              <div>Route</div>
              <div>Request Count</div>
              <div>Last Request</div>
            </div>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="table-grid row">
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

  const visibleStats = showAllStats
    ? stats
    : stats.filter((stat) => stat.email === currentUserEmail);

  const finalStats = showAllStats
    ? Object.values(
        visibleStats.reduce((acc, stat) => {
          const key = stat.route; 
          if (!acc[key]) {
            acc[key] = {
              route: stat.route,
              count: 0,
              lastRequest: stat.lastRequest,
            };
          }
          acc[key].count += stat.count;
          if (stat.lastRequest._seconds > acc[key].lastRequest._seconds) {
            acc[key].lastRequest = stat.lastRequest;
          }
          return acc;
        }, {} as Record<string, { route: string; count: number; lastRequest: { _seconds: number } }>)
      )
    : visibleStats;
  return (
    <div className="stats">
      <h1>{showAllStats ? "All API Usage Stats" : "My API Usage Stats"}</h1>
      <div className="btn-con">
        <Button
          text="My stats"
          className={!showAllStats ? "outline active" : "outline"}
          onClick={() => setShowAllStats(false)}
        />
        <Button
          text="All stats"
          className={showAllStats ? "outline active" : "outline"}
          onClick={() => setShowAllStats(true)}
        />
      </div>
      <div className="table-grid-border">
        <div className="table-grid-wrapper">
          <div className="table-grid header">
            <div>Route</div>
            <div>Request Count</div>
            <div>Last Request</div>
          </div>
          {finalStats.map((stat) => (
            <div key={`${stat.route}`} className="table-grid row">
              <div>{stat.route}</div>
              <div>{stat.count}</div>
              <div>
                {new Date(stat.lastRequest._seconds * 1000).toLocaleDateString(
                  "en-GB"
                )}
              </div>
            </div>
          ))}

          {finalStats.length === 0 && (
            <div className="table-grid row">
              <div>No stats found.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
