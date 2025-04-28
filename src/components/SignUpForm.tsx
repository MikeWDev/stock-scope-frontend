"use client";

import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatFirebaseError } from "@/lib/firebase/formatFirebaseError";
import { FirebaseError } from "firebase/app";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignUp = async (email: string, password?: string) => {
    if (!password) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully! 🎉");
      setTimeout(() => {
        router.push("/signin");
      }, 2500);
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

  return <AuthForm type="signUp" loading={loading} action={handleSignUp} />;
};

export default SignUpForm;
