import React, { useState } from "react";
import Link from "next/link";
import Avatar from "./icons/avatarIcon";

const PrivateNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white text-black w-full flex items-center justify-between p-4 mb-4 border-b-4 border-primary">
      <Link href="/" className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl">Evaluando</span>
      </Link>
      <div className="relative">
        <button
          className="w-9 h-9 p-1 rounded-full text-primary bg-white hover:text-white hover:bg-primary focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary"
          onClick={toggleMenu}
        >
          <Avatar />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-purple-700 rounded-md shadow-lg py-2">
            <Link
              className="block px-4 py-2 hover:bg-purple-100"
              href="/account"
            >
              Cuenta
            </Link>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full text-left block px-4 py-2 hover:bg-purple-100"
              >
                Cerrar Sesión
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PrivateNav;
