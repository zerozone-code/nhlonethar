import React from "react";
import { NAV_LINKS } from "../lib/navigation";

const Footer = () => {
  return (
    <footer className="border-t border-rose-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-10 text-center">
        <p className=" text-xl font-bold text-rose-brand">နှလုံးသား♡</p>
        <p className="max-w-md text-sm text-muted">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <a className="text-sm hover:text-rose-brand" href={link.to}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} နှလုံးသား♡ - All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
