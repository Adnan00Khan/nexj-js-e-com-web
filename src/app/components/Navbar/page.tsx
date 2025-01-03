// src/app/components/Navbar/page.tsx
import React from "react";

type NavbarProps = {
  cartCount: number;
};

const Navbar = ({ cartCount }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">E-commerce</h1>
        <div>
          <span>Cart: {cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
