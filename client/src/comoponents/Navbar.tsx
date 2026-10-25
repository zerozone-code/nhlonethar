import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../lib/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to={"/"} className="text-xl font-bold text-rose-brand">
          နှလုံးသား♡
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                className="text-sm font-medium transition-colors hover:text-rose-brand"
                onClick={() => setIsOpen(false)}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* mobile hambuger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg p-2 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* mobile menu */}
      {isOpen && (
        <ul className="animate-fade-up border-t border-rose-100 bg-cream px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                className="block py-2 hover:text-rose-brand"
                onClick={() => setIsOpen(false)}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
