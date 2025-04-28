import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";

const AuthBox = ({ type }: { type: "signIn" | "signUp" | "resetPassword" }) => {
  return (
    <div className="gradient-border">
      <div className="auth-con">
        <h1>
          {type === "signIn"
            ? "Sign In"
            : type === "signUp"
            ? "Sign Up"
            : "Reset Password"}
        </h1>

        {type === "signIn" ? (
          <SignInForm />
        ) : type === "signUp" ? (
          <SignUpForm />
        ) : (
          <ResetPasswordForm />
        )}

        <div className="links-con">
          {type === "signIn" && (
            <>
              <p>
                Forgot password?{" "}
                <Link href="/resetpassword">
                  Reset now <ArrowRight size={12} />
                </Link>
              </p>
              <p>
                You don&apos;t have an account?{" "}
                <Link href="/signup">
                  Sign up <ArrowRight size={12} />
                </Link>
              </p>
            </>
          )}

          {type === "signUp" && (
            <p>
              Do you have an account?{" "}
              <Link href="/signin">
                Sign in <ArrowRight size={12} />
              </Link>
            </p>
          )}

          {type === "resetPassword" && (
            <p>
              Go back to login{" "}
              <Link href="/signin">
                Sign in <ArrowRight size={12} />
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthBox;
