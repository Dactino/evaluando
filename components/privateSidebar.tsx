import React, { useState } from "react";
import MenuIcon from "@/components/icons/menuIcon";
import XIcon from "@/components/icons/XIcon";
import ELink from "@/components/ELink";

export default function Sidebar(): JSX.Element {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);
  const clases = [{ name: "Matematicas", href: "/" }];

  const getLinks = () => {
    let content = [];
    for (let link of clases) {
      content.push(
        <li key={link.name}>
          <ELink name={link.name} href={link.href} />
        </li>
      );
    }
    return content;
  };
  return (
    <div className="py-4 px-2 w-fill bg-primary h-full min-h-screen gap-4">
      <button
        className="mx-auto mb-6 bg-primary p-2 text-white rounded-md hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
        onClick={toggleShow}
      >
        <div className="w-8 ">{show ? <XIcon /> : <MenuIcon />}</div>
      </button>
      {show && (
        <ul>
          <li>
            <ELink name="Inicio" href="/dashboard" />
          </li>
          {getLinks()}
        </ul>
      )}
    </div>
  );
}
