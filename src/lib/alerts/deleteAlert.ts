"use client";
import toast from "react-hot-toast";
import { waitForAuthReady } from "../firebase/firebase";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function deleteAlert(alertId: string) {
  const user = await waitForAuthReady();

  if (!user) {
    toast.error("Not authenticated. Please log in.");
    return null;
  }

  try {
    const token = await user.getIdToken();

    const res = await fetch(`${API_URL}/alerts/${alertId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete alert: ${res.statusText}`);
    }

    toast.success("Alert deleted successfully!");
  } catch (error) {
    console.error("Error deleting alert:", error);
    toast.error("Failed to delete alert");
  }
}
