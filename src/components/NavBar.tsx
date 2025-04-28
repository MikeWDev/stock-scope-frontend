import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <nav className="container">
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
    </nav>
  );
};

export default NavBar;
