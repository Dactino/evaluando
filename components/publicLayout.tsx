"use client";
import Sidebar from "./privateSidebar";
import PrivateNav from "./privateNav";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-black bg-white h-screen flex flex-row">
      <Sidebar />
      <div className="w-full">
        <PrivateNav />
        {children}
      </div>
    </div>
  );
}
