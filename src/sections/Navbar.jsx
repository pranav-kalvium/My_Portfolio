import { useState } from "react";

import { navLinks } from "../constants/index.js";

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors"
          >
            Pranav
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
            <a
              href="/assets/MayurKSetty.pdf"
              download="MayurKSetty_CV.pdf"
              className="ml-4 px-5 py-2 rounded-xl bg-black text-white border border-white/20 font-medium shadow-sm hover:bg-neutral-800 hover:border-white/40 transition-all duration-300"
            >
              Download CV
            </a>
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
          <a
            href="/assets/MayurKSetty.pdf"
            download="MayurKSetty_CV.pdf"
            className="mt-3 px-5 py-2 rounded-xl bg-black text-white border border-white/20 font-medium shadow-sm hover:bg-neutral-800 hover:border-white/40 transition-all duration-300 text-center"
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
