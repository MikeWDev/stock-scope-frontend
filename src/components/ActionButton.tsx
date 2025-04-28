"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const ActionButton = ({ to, text }: { to: string; text: ReactNode }) => {
  const pathName = usePathname();
  const isActive = pathName === to;

  return (
    <div className={`action-button-wrapper  `}>
      <div className="glow"></div>
      <Link className={`action-button ${isActive && "active"}`} href={to}>
        {text}
      </Link>
    </div>
  );
};
