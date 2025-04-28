import AuthBox from "@/components/AuthBox";
import React from "react";

const page = () => {
  return (
    <section className="auth">
      <AuthBox type="resetPassword" />
    </section>
  );
};

export default page;
