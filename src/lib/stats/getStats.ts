"use client";

import toast from "react-hot-toast";
import { waitForAuthReady } from "../firebase/firebase";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getUserStats() {
  const user = await waitForAuthReady();

  if (!user) {
    toast.error("Not authenticated. Please log in.");
    return null;
  }

  try {
    const token = await user.getIdToken();

    const res = await fetch(`${API_URL}/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch stats: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    toast.error("Failed to fetch stats");
    return [];
  }
}
