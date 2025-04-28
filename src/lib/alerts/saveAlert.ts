import toast from "react-hot-toast";
import { waitForAuthReady } from "../firebase/firebase";

interface AlertData {
  symbol: string;
  targetPrice: number;
  alertName: string;
  direction: "above" | "below";
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function saveAlert({
  symbol,
  targetPrice,
  alertName,
  direction,
}: AlertData) {
  const user = await waitForAuthReady();
  if (!user) {
    toast.error("Not authenticated. Please log in.");
    return;
  }

  try {
    const token = await user.getIdToken();
    const res = await fetch(`${API_URL}/postalert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ symbol, targetPrice, alertName, direction }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
