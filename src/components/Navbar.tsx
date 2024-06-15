"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 backdrop-blur-xl bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Kernel
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
            <Link
              href="#environment"
              className="text-gray-700 hover:text-black"
            >
              Environment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
