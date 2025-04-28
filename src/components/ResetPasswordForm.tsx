"use client";

import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
      toast.success(
        "If an account with this email exists, a password reset email has been sent. 📩"
      );
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    }
  };

  return (
    <AuthForm
      type="resetPassword"
      loading={loading}
      action={handleResetPassword}
    />
  );
};

export default ResetPasswordForm;
