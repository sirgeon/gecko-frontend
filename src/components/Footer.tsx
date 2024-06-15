"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <nav className="w-full bottom-0 backdrop-blur-xl bg-white border-t mt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="https://vegewa.dev"
              className="text-gray-700 hover:text-black"
            >
              made by vegewa
            </Link>
          </div>
          <div className="space-x-4 sm:block hidden">
            <p className="text-gray-700">Copyright © Kernel 2024</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
