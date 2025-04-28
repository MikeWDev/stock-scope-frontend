"use client";
import toast from "react-hot-toast";
import { SingleStock } from "../../../types";
import { auth, waitForAuthReady } from "../firebase/firebase";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getStock(symbol: string): Promise<SingleStock | null> {
  const user = await waitForAuthReady();

  if (!user) {
    toast.error("Not authenticated. Please log in.");
    return null;
  }
  try {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Not authenticated. Please log in.");
      return null;
    }

    const token = await user.getIdToken();
    const res = await fetch(`${API_URL}/stock?symbol=${symbol}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      toast.error("Something went wrong while fetching the stock");
      console.error(`Failed to fetch stock: ${res.statusText}`);
      return null;
    }

    const data = (await res.json()) as SingleStock;
    return data;
  } catch (error) {
    toast.error("Something went wrong while fetching the stock");
    console.error("Error fetching stock:", error);
    return null;
  }
}
