"use client";

import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { formatFirebaseError } from "../lib/firebase/formatFirebaseError";

import { setAuthCookie } from "@/lib/auth/auth";
import { FirebaseError } from "firebase/app";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (email: string, password?: string) => {
    if (!password) return;
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! 🚀");
      const token = await user.getIdToken();
      setAuthCookie(token);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        const rawCode = (err as FirebaseError).code || "";
        const friendlyMessage = formatFirebaseError(rawCode);
        toast.error(friendlyMessage);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="signIn" loading={loading} action={handleSignIn} />;
};

export default SignInForm;
