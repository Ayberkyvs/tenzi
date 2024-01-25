import React from "react";

function Header() {
  return (
    <div className="flex justify-center items-center w-full h-[40px] bg-[#0B2434] fixed top-0">
      <a
        href="https://www.ayberkyavas.com"
        className="header--logo text-white -rotate-[5deg] text-2xl"
      >
        Yavas
      </a>
    </div>
  );
}

export default Header;
