"use client";
import { sidebarLinks } from "@/constants/sidebarLinks";
import Image from "next/image";
import React, { useEffect } from "react";
import { ActionButton } from "./ActionButton";
import Button from "./Button";
import { logout } from "@/lib/auth/auth";
import { usePathname } from "next/navigation";
import { DollarSign } from "lucide-react";
import { waitForAuthReady } from "@/lib/firebase/firebase";

const SideBar = () => {
  //Just in case we all know what happend in next14 (I am talking about the bug when we could bypass middleware checks if we send the same request a few times)
  useEffect(() => {
    async function checkUser() {
      const user = await waitForAuthReady();
      if (!user) {
        console.log("No user found, logging out...");
        logout();
      } else {
        console.log("User found:", user.email);
      }
    }

    checkUser();
  }, []);
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="logo-con">
        <Image
          src={"/Logo.svg"}
          height={55}
          width={37}
          alt="The logo of the Stock Scope company"
        />
        <h2>
          stock <span>scope</span>
        </h2>
      </div>
      <div className="action-con">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;
          return (
            <ActionButton
              key={item.label}
              to={item.href}
              text={
                <>
                  <Icon size={20} />
                  {item.label}
                </>
              }
            />
          );
        })}
        {pathname.startsWith("/dashboard/") &&
          pathname.split("/").length === 3 &&
          !["dashboard", "alerts", "mystats"].includes(
            pathname.split("/")[2]
          ) && (
            <ActionButton
              to={pathname}
              text={
                <>
                  <DollarSign size={20} />
                  {pathname.split("/")[2]}
                </>
              }
            />
          )}
      </div>
      <Button text="Logout" className="outline" onClick={() => logout()} />
    </aside>
  );
};

export default SideBar;
