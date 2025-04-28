"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAuthCookie = (token: string) => {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
};

export const getAuthCookie = () => {
  const token = cookies().get("token")?.value;
  return token || null;
};

export const removeAuthCookie = () => {
  cookies().delete("token");
};
export async function logout() {
  removeAuthCookie();
  redirect("/signin");
}
