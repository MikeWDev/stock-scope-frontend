"use client";

import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-hot-toast";

type AuthFormProps = {
  loading: boolean;
  action: (email: string, password?: string) => void;
  type: "signIn" | "signUp" | "resetPassword";
};

const AuthForm = ({ loading, action, type }: AuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "signUp" && password !== repeatPassword) {
      toast.error("Passwords do not match! 🔒");
      return;
    }

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    if (type !== "resetPassword" && !password) {
      toast.error("Please enter your password.");
      return;
    }

    action(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === "signUp" && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {type !== "resetPassword" && (
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      {type === "signUp" && (
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      )}

      <Button
        className="full"
        text={
          type === "signIn"
            ? "Sign In"
            : type === "signUp"
            ? "Sign Up"
            : "Reset Password"
        }
        loading={loading}
        type="submit"
      />
    </form>
  );
};

export default AuthForm;
