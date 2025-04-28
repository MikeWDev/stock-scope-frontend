"use client";

import toast from "react-hot-toast";
import { Stock } from "../../../types";
import { auth, waitForAuthReady } from "../firebase/firebase";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getStocks(): Promise<Stock[] | null> {
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

    const res = await fetch(`${API_URL}/stocks`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      toast.error("Failed to fetch stocks");
      return null;
    }

    const data = (await res.json()) as Stock[];
    return data;
  } catch (error) {
    toast.error("Something went wrong while fetching stocks");
    console.error(error);
    return null;
  }
}
