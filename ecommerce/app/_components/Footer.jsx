import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 h-12">
      <div className="max-w-5xl px-4 py-2 mx-auto sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex justify-center text-teal-600">
            <Image src="/logo.svg" alt="logo" width={50} height={20} />
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex space-x-6">
          <a className="text-gray-700 transition hover:text-teal-600" href="/">
            About
          </a>
          <a className="text-gray-700 transition hover:text-teal-600" href="/">
            Careers
          </a>
          <a className="text-gray-700 transition hover:text-teal-600" href="/">
            History
          </a>
          <a className="text-gray-700 transition hover:text-teal-600" href="/">
            Services
          </a>
          <a className="text-gray-700 transition hover:text-teal-600" href="/">
            Projects
          </a>
          <a className="text-gray-700 transition hover:text-teal-600" href="/">
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
